import bcrypt from 'bcrypt';

import { verifyOtp } from "../plugins";
import { AdminModel } from '../../famwork-entities';
import { getAdminService } from '../../famwork-accounts/admin/services';
import { 
  ChangeAdminPasswordDTO, VerifyUserPasswordDTO, VerifyAdminEmailDTO, ResetPasswordDTO } from '../DTOs/passwordManager.DTO';


export const VerifyAdminPasswordService = async ({ oldPassword, email }: VerifyUserPasswordDTO) => {
  const admin = await getAdminService({email}, {shouldPopulate: false});
  const passwordVerfied = await bcrypt.compare(oldPassword, admin.password);
  if (!passwordVerfied) throw new Error(`passwords don't match`);
  return { success: true, message: `valid credentials. OTP mail sent to ${email}`, data: admin, hookData: admin };
};

export const VerifyAdminEmailService = async ({ adminID, email }: VerifyAdminEmailDTO) => {
    const admin = await getAdminService({ adminID }, { onAdminNotFound: () => { } });
  const emailMatch = admin.email == email;
  if (!emailMatch) throw new Error(`emails don't match`);
  return { success: true, message: `valid email: ${email}`, data: admin, hookData: admin };
};

export const ChangeAdminPasswordService = async ({adminID, newPassword, confirmPassword,}: ChangeAdminPasswordDTO) => {
    const { _id } = await getAdminService({ adminID }, { onAdminNotFound: () => { } });

  const passwordVerified = newPassword === confirmPassword;
  if (!passwordVerified) throw new Error(`passwords don't match`);
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  
  const data = await AdminModel.findByIdAndUpdate(_id, 
    { password: hashedPassword }, {new: true});  
  return { success: true, message: 'password reset successful', data, hookData: data };
};

export const ResetAdminPasswordService = async (
  {email, newPassword, confirmPassword, otp }: ResetPasswordDTO) => {
  const otpVerification = await verifyOtp(email, otp);
  if (!otpVerification) return { success: false, message: 'otp expired or incorrect', data: null, hookData: null};

  const passwordVerified = newPassword === confirmPassword;
  if (!passwordVerified) throw new Error(`passwords don't match`);
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const {_id} = await getAdminService({email}, {shouldPopulate: false});
  const data = await AdminModel.findByIdAndUpdate(_id, 
    { password: hashedPassword }, {new: true});  
  return { success: true, message: 'password reset successful', data, hookData: data };  
};
