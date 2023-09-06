export class MailSendOtpDTO {
  email: string;
  type: OTP;
}

export class TextSendOtpDTO {
  email: string;
  type: OTP;
}

export type OTP = 'verify' | 'reset' | 'general';
