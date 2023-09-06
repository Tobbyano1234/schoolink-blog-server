import nodemailer from "nodemailer";
import { IMailInfo, Template } from "./types";
import {
  otpVerificationTemp,
  welcomeTemp,
} from "./template";
import dotenv from "dotenv";
// dotenv.config({ path: "../../../../.env" });
dotenv.config();

type IMail = {
  from: string;
  to: string | string[];
  subject: string;
  html: string | undefined;
};

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = ({
  from,
  subject,
  to,
  html,
}: IMail): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to, html }, (err: any, info: any) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

export const sendMailByNodeMailer = async ({
  templateId,
  subject,
  to,
  templateData,
}: IMailInfo) => {
  const { otp, firstName, timeLeft, lastName, url, content, buttonText } = templateData as Template;
  let html = "";
  if (templateId === "account creation") {
    html = welcomeTemp(firstName, lastName);
  }
  if (templateId === "account verification") {
    html = otpVerificationTemp({ firstName, otp, timeLeft, url, content, buttonText });
  }

  if (templateId === "reset password") {
    html = otpVerificationTemp({ firstName, otp, timeLeft, url, content, buttonText });
  }
  await sendEmail({ from: `support@taskmanager.com`, subject, to, html });
};
