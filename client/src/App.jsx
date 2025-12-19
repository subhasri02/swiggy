
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

// Pages
import FoodDelivery from "./pages/FoodDelivery";
import CartPage from "./pages/CartPage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import Restaurant from "./pages/Restaurant";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import PaymentPage from "./pages/PaymentPage";

// Admin Pages
import AdminOrders from "./pages/admin/AdminOrders";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute"; 

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<FoodDelivery />} />

        {/* Restaurant Menu */}
        <Route path="/restaurant/:resId" element={<Restaurant />} />

        {/* Cart */}
        <Route path="/cart" element={<CartPage />} />

        {/* Checkout (LOGIN REQUIRED) */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        {/* Payment (LOGIN REQUIRED) */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        {/* Order Success (LOGIN REQUIRED) */}
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
