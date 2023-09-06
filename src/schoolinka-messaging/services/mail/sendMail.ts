import { IMailInfo } from './types';
import { sendMailByNodeMailer } from './sendMail.nodemailer';


export const sendMailByClient = (client = 'nodemailer' as "nodemailer" ) => {
  const MailClients: {
    [key in "nodemailer"] : (data: IMailInfo) => void;
  } = {
    "nodemailer": sendMailByNodeMailer,
  };
  const Mailer = MailClients[client];
  return async (data: IMailInfo) => Mailer(data);
};
