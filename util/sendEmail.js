const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1, Create transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //2, define the email option
  const mailOptions = {
    from: 'Betselot Bezuayehu<kingBetse.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  //3,sendTheEmail
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
