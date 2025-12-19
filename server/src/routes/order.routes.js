
import express from "express";
import Order from "../models/Order.js";
import User from "../models/user.model.js";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";
import { sendOrderConfirmationMail } from "../utils/mail.js";

const router = express.Router();

/* =========================
   PLACE ORDER (LOGIN ONLY)
========================= */
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, address } = req.body;

    //  Validations
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    //  Create order
    const order = await Order.create({
      userId: req.userId,           // from JWT
      items,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      address: address || "N/A",
      status: "Pending",
    });

    //  Fetch user email
    const user = await User.findById(req.userId);

    //  Send confirmation email (non-blocking)
    if (user?.email) {
      sendOrderConfirmationMail(user.email, {
        items: order.items,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        userName: user.fullName,
      }).catch((err) =>
        console.error("❌ Email send failed:", err.message)
      );
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

/* =========================
   GET MY ORDERS (USER)
========================= */
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* =========================
   ADMIN: GET ALL ORDERS
========================= */
router.get("/admin/orders", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullName email mobile")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* =========================
   ADMIN: UPDATE ORDER STATUS
========================= */
router.put("/admin/orders/:id", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
});

export default router;
