import { nameFormat } from '../misc/name';
import { MailAccount } from './typings';
import { sendMailByClient } from '../../famwork-messaging/services/mail';

const sendMail = sendMailByClient();

interface IMailBody {
  account: MailAccount;
  otp: string;
  timeLeft: string;
};

const verifyOtpMail = async (mailBody: IMailBody) => {
  const { account, otp, timeLeft } = mailBody;
  await sendMail({
    to: account.email,
    subject: `Glide Account OTP`,
    text: 'otpMail',
    templateId: 'account verification',
    templateData: {
      firstName: nameFormat(account.firstName),
      lastName: nameFormat(account.lastName),
      otp,
      timeLeft,
      // url: ""
    },
  });
};


const resetOtpMail = async (mailBody: IMailBody) => {
  const { account, otp, timeLeft } = mailBody;
  await sendMail({
    to: account.email,
    subject: `Glide Account OTP`,
    text: 'otpMail',
    templateId: 'reset password',
    templateData: {
      firstName: nameFormat(account.firstName),
      lastName: nameFormat(account.lastName),
      otp,
      timeLeft,
      // url: ""
    },
  });
};

const generalOtpMail = async (mailBody: IMailBody) => {
  const { account, otp, timeLeft } = mailBody;
  await sendMail({
    to: account.email,
    subject: `Glide Account OTP`,
    text: 'otpMail',
    templateId: 'd-3cab1494114a4a2690973699758159d8',
    templateData: {
      firstName: nameFormat(account.firstName),
      lastName: nameFormat(account.lastName),
      otp,
      timeLeft,
      // url:
    },
  });
};


const sendOtpMailByType = {
  'verify': verifyOtpMail,
  'reset': resetOtpMail,
  'general': generalOtpMail,
};

export const sendOtpMail = async (
  mailType: 'verify' | 'reset' | 'general',
  mailBody: {
    account: MailAccount,
    otp: string,
    timeLeft: string,
  },
) => {
  return sendOtpMailByType[mailType](mailBody);
};
