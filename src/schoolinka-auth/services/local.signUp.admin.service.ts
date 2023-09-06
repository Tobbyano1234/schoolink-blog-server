import bcrypt from 'bcrypt';

import { LocalSignUpAdminDTO } from '../DTOs/signUp.DTO';
import { Admin, AdminModel, GeneralModel, ModelNames } from '../../famwork-entities';
import { issueOtp } from '../plugins';
import { AccountSignType, AccountStatus } from '../../typings/Account.types';
import { sendOtpMail } from '../../famwork-shared/mail';

export const LocalSignUpAdminService = async (DTO: LocalSignUpAdminDTO) => {
    const { firstName, lastName, email, password, phoneNumber } = DTO;

    const adminExists = await AdminModel.findOne({
        $or: [
            { email: email }, // Match the email
            { phoneNumber: phoneNumber }, // Match the phone
        ],
    }) as Admin;

    if (adminExists) {
        const emailExists = adminExists.email === email;
        const phoneNumberExists = adminExists.phoneNumber === phoneNumber;

        if (emailExists) return { success: false, message: 'email already registered with an existing account', data: null };
        if (phoneNumberExists) return { success: false, message: 'phone number already registered with an existing account', data: null };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await AdminModel.create(
        { firstName, lastName, email, password: hashedPassword, phoneNumber });

    // const { email } = admin;
    const otpData = await issueOtp(admin.email);
    console.log("otp", otpData)
    const { emailOtp: otp, timeLeft } = otpData;
    await GeneralModel.create(
        {
            collectionID: admin._id, collectionName: ModelNames.ADMIN,
            associatedData: {
                type: 'metaData',
                metaData: {
                    signType: AccountSignType.DIRECT,
                    status: AccountStatus.ACTIVE,
                    firstLoginDate: null, // depends on if we send an access token during sign up
                    lastLoginDate: null,
                    passwordChangedAt: [],
                    verifiedAt: null,
                }
            }
        }
    );
    await sendOtpMail('verify', { account: admin, otp, timeLeft: `${timeLeft} minutes` });

    return { success: true, message: 'new account created', data: { admin, otpData } };
};
