import express from "express";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* =========================
   CREATE PAYMENT INTENT
========================= */
router.post("/create-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    // Stripe expects amount in paise (INR)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // ₹ → paise
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: "Stripe payment failed" });
  }
});

export default router;
