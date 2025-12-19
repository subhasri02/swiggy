
import express from "express";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";
import Menu from "../models/Menu.js";
import Order from "../models/Order.js";

const router = express.Router();

/*ADD MENU (ADMIN ONLY) */
router.post("/menu", protect, adminOnly, async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json({
      success: true,
      menu,
    });
  } catch (error) {
    console.error("Add menu error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add menu",
    });
  }
});

/*GET ALL ORDERS (ADMIN ONLY)*/
router.get("/orders", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullName email mobile")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      orders: [], // ✅ prevent frontend crash
    });
  }
});

/*UPDATE ORDER STATUS (ADMIN)*/
router.put("/orders/:id", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
});

export default router;
