import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  itemId: String,
  name: String,
  description: String,
  price: Number,
  image: String,
  isVeg: Boolean,
  category: String,
});

const menuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: true,
      unique: true,
    },
    restaurantName: String,
    menuItems: [menuItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
