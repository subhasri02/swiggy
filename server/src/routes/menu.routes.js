import express from "express";
import Menu from "../models/Menu.js";

const menuRouter = express.Router();

menuRouter.get("/:restaurantId", async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId.trim();

    const menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default menuRouter;
