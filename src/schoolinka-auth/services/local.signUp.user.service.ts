import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

import { AccountSignType, AccountStatus } from '../../typings/Account.types';
import { config } from '../../famwork-web-api/config';
import { GeneralModel } from '../../famwork-entities/General';
import { issueOtp } from '../plugins';
import { LocalSignUpUserDTO, } from "../DTOs/signUp.DTO";
import { sendOtpMail } from '../../famwork-shared/mail';
import { User, UserModel, ModelNames } from "../../famwork-entities";

export const LocalSignUpUserService = async (DTO: LocalSignUpUserDTO) => {
    const { firstName, lastName, email, password, phoneNumber, avatar } = DTO as LocalSignUpUserDTO;
    const emailExist = await UserModel.findOne({ email }) as User;
    if (emailExist) return { success: false, message: `email already registered with an existing account` };

    const saltWorker = +config.defaults.saltWorker;
    const hashedPassword = await bcrypt.hash(password, saltWorker);
    const user = await UserModel.create({ firstName, lastName, email, password: hashedPassword, phoneNumber, avatar });

    const otpData = await issueOtp(email);
    const { emailOtp: otp, timeLeft } = otpData;

    await GeneralModel.create(
        {
            collectionID: new Types.ObjectId(user._id), collectionName: ModelNames.USER,
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

    await sendOtpMail('verify', { account: user, otp, timeLeft: `${timeLeft} minutes` });
    return { success: true, message: 'new account created', data: { user, otp: otpData } };
};
