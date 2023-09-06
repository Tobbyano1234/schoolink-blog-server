import { OTP } from "./sendOtp.DTO";

export type MailVerifyOtpDTO = {
  type: OTP;
  otp: string;
  email: string;
  newPassword?: string;
};
