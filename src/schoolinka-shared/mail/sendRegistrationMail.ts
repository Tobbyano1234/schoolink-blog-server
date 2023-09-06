import { sendMailByClient } from "../../famwork-messaging/services/mail";
import { nameFormat } from "../misc";
import { MailAccount } from "./typings";

const sendMail = sendMailByClient();

export const sendRegistrationMail = async (account: MailAccount) => {
  await sendMail({
    to: account.email,
    subject: `Account Created ${account.firstName + ' ' + (account.lastName || " ")}`,
    text: `This is to notify you that you just registered an account with us.`,
    templateId: 'account creation',
    templateData: {
      firstName: nameFormat(account.firstName),
      lastName: nameFormat(account.lastName),
      otp:"",
      timeLeft: ""
    }
  });
};
