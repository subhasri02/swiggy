

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";

// ROUTES
import authRouter from "./src/routes/auth.routes.js";
import menuRouter from "./src/routes/menu.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import adminRouter from "./src/routes/admin.routes.js";
import paymentRouter from "./src/routes/payment.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/* CORS CONFIG (JWT ONLY) */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* MIDDLEWARE*/
app.use(express.json());
/* ROUTES */
app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/payment", paymentRouter);

/*START SERVER */
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
  });
