import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
    console.log("sendEmail", email, subject, message);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: subject,
    text: message,
  };

  console.log("mailOptions", mailOptions);  
  await transporter.sendMail(mailOptions);
};


