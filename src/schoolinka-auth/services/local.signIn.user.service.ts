// import bcrypt from 'bcrypt';
// import httpStatus from 'http-status';
// // import { Types } from 'mongoose';

// import {
//     ModelNames, User
// } from "../../schoolinka-entities";
// import { GeneralModel } from '../../schoolinka-entities/General';
// import {
//     AccountStatus, AccountType
// } from '../../typings/Account.types';
// import { LocalSignInDTO } from '../DTOs/signIn.DTO';
// import { getUserService } from '../../schoolinka-accounts/user/services';
// import { UserMetaDataGeneral } from '../../typings/User.types';
// import { issueToken } from '../plugins/token.plugin';
// import { sendOtpMail } from '../../schoolinka-shared/mail';
// import { issueOtp } from '../plugins';

// export const LocalSignInUserService = async (DTO: LocalSignInDTO) => {
//     const { email, password } = DTO;
//     const user = await getUserService({ email }, { onUserNotFound: () => { }, withPassword: true }) as User;
//     if (!user) return { success: false, message: 'user not found', data: null };

//     const { id, firstName, lastName, status, password: hashedPassword, isDeactivatedAccount, isVerified, phoneNumber, avatar, isNewUser } = user as User;

//     const passwordVerfied = await bcrypt.compare(password, (hashedPassword as string));
//     if (!passwordVerfied) return { success: false, status: httpStatus.UNAUTHORIZED, message: `incorrect credentials` };

//     const userMetaData = await GeneralModel.findOne(
//         { collectionID: (id), collectionName: ModelNames.USER, 'associatedData.type': 'metaData' }) as UserMetaDataGeneral;

//     if (!userMetaData) {
//         return {
//             success: false,
//             message: 'cannot authorize user',
//             data: user,
//         }
//     };

//     if (!isVerified) {
//         const otpData = await issueOtp(email);
//         const { emailOtp: otp, timeLeft } = otpData;
//         await sendOtpMail('verify', { account: { email, firstName, lastName }, otp, timeLeft: `${timeLeft} minutes` });
//     };

//     if (!userMetaData || !userMetaData.associatedData.metaData.verifiedAt) {
//         return {
//             success: false,
//             status: httpStatus.FORBIDDEN,
//             message: 'user not verified, kindly verify your account',
//             data: user,
//         };
//     }

//     if (status == AccountStatus.SUSPENDED) return {
//         success: false, status: httpStatus.FORBIDDEN, message: `user currently suspended`
//     };

//     const token = await issueToken({ accountType: AccountType.USER, id, issuedAt: Date.now(), email });
//     const meta = { walletBalance: 0, };
//     (user as any).meta = meta;

//     if (isDeactivatedAccount) {
//         await User.update(id, { isDeactivatedAccount: false });
//     }

//     if (userMetaData) {
//         const { associatedData } = userMetaData;
//         if (!associatedData.metaData.lastLoginDate) {
//             await GeneralModel.findByIdAndUpdate(userMetaData._id,
//                 {
//                     'associatedData.metaData.firstLoginDate': new Date(),
//                 }
//             );
//             await UserModel.findByIdAndUpdate(_id, { isNewUser: false });
//         }
//         await GeneralModel.findByIdAndUpdate(userMetaData._id,
//             {
//                 'associatedData.metaData.lastLoginDate': new Date(),
//             }
//         );
//     };

//     const data = { _id, firstName, lastName,  email, phoneNumber, avatar,  isDeactivatedAccount, isVerified, isNewUser, }
//     return {
//         success: true,
//         status: httpStatus.OK,
//         message: 'user signed in successfully',
//         data,
//         token,
//     };
// };

