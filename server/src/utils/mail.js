// // /* the email from which we gonna send email to the user */


import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

/* =========================
   MAIL TRANSPORTER
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,   // your gmail
    pass: process.env.PASS,    // app password
  },
});

// Verify mail server on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Mail server error:", error);
  } else {
    console.log("✅ Mail server ready");
  }
});

/* =========================
   SEND OTP MAIL
========================= */
export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: `"FoodBite Support" <${process.env.EMAIL}>`,
    to,
    subject: "🔐 Password Reset OTP",
    html: `
      <h2>Password Reset</h2>
      <p>Your OTP is:</p>
      <h1 style="color:#ff4d2d;">${otp}</h1>
      <p>Valid for 5 minutes</p>
    `,
  });

  console.log("✅ OTP mail sent to", to);
};

/* =========================
   SEND ORDER CONFIRMATION
========================= */
export const sendOrderConfirmationMail = async (email, order) => {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.name} × ${item.quantity} — ₹${item.price}</li>`
    )
    .join("");

  await transporter.sendMail({
    from: `"FoodBite" <${process.env.EMAIL}>`,
    to: email,
    subject: "✅ Order Confirmed – FoodBite",
    html: `
      <h2>Hi ${order.userName},</h2>
      <p>Your order has been placed successfully 🎉</p>

      <h3>Order Details</h3>
      <ul>${itemsHtml}</ul>

      <p><b>Total:</b> ₹${order.totalAmount}</p>
      <p><b>Payment:</b> ${order.paymentMethod}</p>

      <p>Thank you for ordering with FoodBite ❤️</p>
    `,
  });

  console.log("✅ Order confirmation mail sent to", email);
};
