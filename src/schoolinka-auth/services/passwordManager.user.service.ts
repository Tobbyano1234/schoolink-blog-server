import bcrypt from 'bcrypt';

import { config } from '../../famwork-web-api/config';
import { getUserService } from '../../famwork-accounts/user/services';
import { ChangeUserPasswordDTO, ResetPasswordDTO, VerifyUserEmailDTO, VerifyUserPasswordDTO} from '../DTOs/passwordManager.DTO';
import { issueOtp, verifyOtp } from '../plugins';
import { sendOtpMail } from '../../famwork-shared/mail';
import { User, UserModel, GeneralModel, ModelNames } from '../../famwork-entities';

const saltWorker = +config.defaults.saltWorker;

export const VerifyUserPasswordService = async ({ oldPassword, email, computedProps }: VerifyUserPasswordDTO) => {
  const _user = computedProps ? computedProps._user : null;
  const user = _user || await getUserService({ email }, { onUserNotFound: () => { }, withPassword: true }) as User;
  if (!user) return { success: false, message: `user not found` };

  const passwordVerfied = await bcrypt.compare(oldPassword, user?.password!);
  if (!passwordVerfied) throw new Error(`passwords don't match`);

  const otpData = await issueOtp(email);
  const { emailOtp: otp, timeLeft } = otpData;
  await sendOtpMail('reset', { account: user!, otp, timeLeft: `${timeLeft} in minutes` });

  return { success: true, message: `valid credentials. OTP mail sent to ${email}`, data: user };
};

export const VerifyUserEmailService = async ({ userID, email }: VerifyUserEmailDTO) => {
  const user = await getUserService({ userID }, { onUserNotFound: () => { } });
  if (!user) return { success: false, message: `user not found` };
  const emailMatch = user?.email == email;
  if (!emailMatch) throw new Error(`emails don't match`);
  return { success: true, message: `valid email: ${email}`, data: user };
};

export const ChangeUserPasswordService = async ({ userID, oldPassword, newPassword, confirmPassword, computedProps, otp }: ChangeUserPasswordDTO) => {
  const _user = computedProps ? computedProps._user : null;
  const user = _user || await getUserService({ userID }, { onUserNotFound: () => { } });

  const { _id, email } = user!;
  const otpVerification = await verifyOtp(email, otp);
  if (!otpVerification) return { success: false, message: 'otp expired or incorrect', data: null };

  await VerifyUserPasswordService({ oldPassword, email, computedProps: { _user: user } });
  const passwordVerified = newPassword === confirmPassword;
  if (!passwordVerified) throw new Error(`passwords don't match`);
  const hashedPassword = await bcrypt.hash(newPassword, saltWorker);

  const data = await UserModel.findByIdAndUpdate(_id,
    { password: hashedPassword }, { new: true });

  await GeneralModel.findOneAndUpdate(
    { collectionID: data?._id, collectionName: ModelNames.USER, 'associatedData.type': 'metaData' },
    {
      $push: { 'associatedData.metaData.passwordChangedAt': new Date() }
    },
    { new: true }
  );

  return { success: true, message: 'password reset successfully', data };
};

export const ResetUserPasswordService = async (
  { email, newPassword, confirmPassword, otp }: ResetPasswordDTO) => {
  const otpVerification = await verifyOtp(email, otp);
  if (!otpVerification) return { success: false, message: 'otp expired or incorrect', data: null };

  const passwordVerified = newPassword === confirmPassword;
  if (!passwordVerified) throw new Error(`passwords don't match`);
  const hashedPassword = await bcrypt.hash(newPassword, saltWorker);

  const user = await getUserService({ email }, { onUserNotFound: () => { } }) as User;
  if (!user) return { success: false, message: 'user not found', data: null };

  const { _id } = user;
  const data = await UserModel.findByIdAndUpdate(_id,
    { password: hashedPassword }, { new: true });
  await GeneralModel.findOneAndUpdate(
    { collectionID: data?._id, collectionName: ModelNames.USER, 'associatedData.type': 'metaData' },
    {
      $push: { 'associatedData.metaData.passwordChangedAt': new Date() }
    },
    { new: true }
  );
  return { success: true, message: 'password reset successful', data };
};
