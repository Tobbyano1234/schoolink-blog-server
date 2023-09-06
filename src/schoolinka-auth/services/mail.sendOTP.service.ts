import { issueOtp } from '../plugins';
import { MailSendOtpDTO } from '../DTOs/sendOtp.DTO';
import { sendOtpMail } from '../../famwork-shared/mail';
import { getUserService } from '../../famwork-accounts/user/services';
import { User } from '../../famwork-entities';
import { getAdminService } from '../../famwork-accounts/admin/services';


export const MailSendUserOtpService = async ({ email, type }: MailSendOtpDTO) => {
  const user = await getUserService({ email }, { onUserNotFound: () => { } }) as User;
  if (!user) return { success: false, message: `user not found` }

  const otpData = await issueOtp(user.email);
  const { emailOtp: otp, timeLeft } = otpData;
  await sendOtpMail(type ? type : 'general', { account: user, otp, timeLeft: `${timeLeft} minutes` });
  return { success: true, message: `otp has been sent to your email`, data: { email } };
};

export const MailSendAdminOtpService = async ({ email, type }: MailSendOtpDTO) => {
  const admin = await getAdminService({ email }, { withPassword: false });
  const otpData = await issueOtp(admin.email);
  const { emailOtp: otp, timeLeft } = otpData;
  await sendOtpMail(type ? type : 'general', { account: admin, otp, timeLeft: `${timeLeft} minutes` });
  return { success: true, message: `otp has been sent to your email`, data: { email } };
};
