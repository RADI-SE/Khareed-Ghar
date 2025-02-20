import { mailtrapClient, sender } from "./confg.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./email.tamplate.js";

import dotenv from "dotenv";
dotenv.config();
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const result = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Khareed-Ghar - Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", result);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error("Could not send verification email", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "91809ee7-f8b1-4046-a879-5ce8681aaf04",
      template_variables: {
        company_info_name: "Khareed-Ghar",
        name: name,
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error("Could not send welcome email", error);
  }
};
export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Khareed-Ghar - Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error("Could not send password reset email", error);
  }
};
export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
