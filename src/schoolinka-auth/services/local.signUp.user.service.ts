import bcrypt from 'bcrypt';

import { AccountSignType, AccountStatus } from '../../typings/Account.types';
import { config } from '../../schoolinka-web-api/config';
import { GeneralModel } from '../../schoolinka-entities/General';
import { issueOtp } from '../plugins';
import { LocalSignUpUserDTO, } from "../DTOs/signUp.DTO";
import { sendOtpMail } from '../../schoolinka-shared/mail';
import { User, ModelNames } from "../../schoolinka-entities";
import {v4 as uuidv4} from 'uuid'

export const LocalSignUpUserService = async (DTO: LocalSignUpUserDTO) => {
    const { firstName, lastName, email, password, phoneNumber, avatar } = DTO as LocalSignUpUserDTO;
    const emailExist = await User.findOne({where: { email }}) as User;
    if (emailExist) return { success: false, message: `email already registered with an existing account` };

    const id = uuidv4()
    const saltWorker = +config.defaults.saltWorker;
    const hashedPassword = await bcrypt.hash(password, saltWorker);
    const user = await User.create({ id, firstName, lastName, email, password: hashedPassword, phoneNumber,avatar });

    const otpData = await issueOtp(email);
    const { emailOtp: otp, timeLeft } = otpData;

    await GeneralModel.create(
        {
            collectionID: user.id, collectionName: ModelNames.USER,
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
