
import express from "express";
import stripe from "../config/stripe.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();
/* CREATE PAYMENT INTENT */
router.post("/create-payment-intent", protect, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
