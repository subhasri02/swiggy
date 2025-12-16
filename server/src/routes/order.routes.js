

import express from "express";
import Order from "../models/Order.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

/* =========================
   PLACE ORDER (LOGIN ONLY)
========================= */
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, address } = req.body;

    // validations
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount missing" });
    }

    const order = await Order.create({
      userId: req.userId, //  from JWT, NOT frontend
      items,
      totalAmount,
      paymentMethod,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  }
});

/* =========================
   GET MY ORDERS (LOGIN ONLY)
========================= */
router.get("/my-orders", protect, async (req, res) => {
  const orders = await Order.find({ userId: req.userId }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

export default router;
