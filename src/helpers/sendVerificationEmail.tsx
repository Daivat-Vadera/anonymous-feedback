import nodemailer from "nodemailer";
import { VerificationEmail } from "@/emailTemplates/VerificationEmail";
import { render } from "@react-email/render";
import { ApiResponse } from "@/types/ApiResponse";

interface sendVerificationEmailProps {
  email: string;
  username: string;
  verifyCode: string;
}

async function sendVerificationEmail({
  email,
  username,
  verifyCode,
}: sendVerificationEmailProps): Promise<ApiResponse> {
  const emailHtml = render(
    <VerificationEmail username={username} otp={verifyCode} />
  );

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: "daivatvadera18@gmail.com",
    to: email,
    html: emailHtml,
  };
  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Verification Email Mail send Successfully",
    };
  } catch (error: any) {
    console.log("Error Sending verification email");
    return {
      success: false,
      message: "Failed to send Verification Email",
    };
  }
}

export default sendVerificationEmail;
