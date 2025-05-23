import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
 
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

  await transporter.sendMail(mailOptions);
};



/*
- Integrated Nodemailer for sending password reset emails  
- Created Reset Password page in the frontend  
- Implemented API call to handle password reset requests  
*/