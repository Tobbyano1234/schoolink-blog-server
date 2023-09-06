// import sendgridMail from '@sendgrid/mail';

// import { IMailInfo } from './types';
// import { config } from '../../../famwork-web-api/config';


// sendgridMail.setApiKey(config.client.mailClient.sendgrid.key);

// export const sendMailBySendGrid = (data: IMailInfo) => {
//   const { from, to, subject, text, templateData, templateId } = data;
//   const { from: sender } = config.defaults.mailInfo;

//   const msg = {
//     subject,
//     text,
//     from: from || sender,
//     html: `'<div style="width: 90%; margin: 5em auto;
//     box-shadow: 0 0 10px rgba(0,0,0,.9);">
//      <div>
//      </div>
//   </div>`,
//     personalizations: [
//       {
//         to: [{ email: to }],
//         dynamicTemplateData: templateData,
//       },
//     ],
//     templateId,
//     mailSettings: {
//       sandboxMode: { enable: config.env === 'test' ? true : false },
//     },
//   };
  
//   sendgridMail
//     .send(msg).then((data) => {
//       console.log("success", data)
//       console.log(data[0].statusCode)
//       // console.log(data[0].headers)
//     })
//     .catch((err: any) => console.error(err.response.body.errors));
// };
