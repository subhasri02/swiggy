// /* the email from which we gonna send email to the user */
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables before using process.env
dotenv.config();

// Log to verify credentials are actually loaded
console.log("Loaded email creds:", process.env.EMAIL, process.env.PASS ? "Loaded" : "Missing");

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  logger: true,
  debug: true,
});

// Function to send OTP mail
export const sendOtpMail = async (to, otp) => {
  try {
    console.log(`Attempting to send OTP to: ${to}`);

    const info = await transporter.sendMail({
      from: `"MyApp Support" <${process.env.EMAIL}>`,
      to,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px; border: 1px solid #eee;">
          <h2>🔐 Password Reset Request</h2>
          <p>Your OTP for resetting your password is:</p>
          <h3 style="color:#ff4d2d;">${otp}</h3>
          <p>This OTP expires in <b>5 minutes</b>.</p>
          <p>If you didn’t request this, you can safely ignore this email.</p>
          <hr/>
          <p style="font-size:12px; color:#888;">© ${new Date().getFullYear()} MyApp</p>
        </div>
      `,
    });

    console.log("OTP email sent successfully:", info.response);
  } catch (err) {
    console.error("Email sending failed:", err);
  }
};
