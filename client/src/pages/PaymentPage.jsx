
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const stripe = useStripe();
  const elements = useElements();

  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  /* =========================
     AUTH + ACCESS CHECK
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to place order");
      navigate("/signin");
      return;
    }

    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  /* =========================
      CARD PAYMENT SUCCESS
  ========================= */
  const onPaymentSuccess = async (paymentId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: state.total,
          paymentMethod: "CARD",
          paymentId,
          address: state.address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Order failed");
        return;
      }

      clearCart();
      navigate("/order-success", {
        state: { orderId: data.order._id },
      });
    } catch (err) {
      console.error("Order confirm error:", err);
      alert("Failed to confirm order");
    }
  };

  /* =========================
      STRIPE CARD PAY
  ========================= */
  const payWithCard = async () => {
    if (!stripe || !elements) {
      alert("Stripe not loaded");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8000/api/payments/create-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: state.total,
          }),
        }
      );

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await onPaymentSuccess(result.paymentIntent.id);
      }
    } catch (error) {
      console.error("Stripe error:", error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      UPI / COD PAY
  ========================= */
  const payNow = async () => {
    const token = localStorage.getItem("token");

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: state.total,
          paymentMethod: method.toUpperCase(), // UPI / CASH ON DELIVERY
          address: state.address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Order failed");
        return;
      }

      clearCart();
      navigate("/order-success", {
        state: { orderId: data.order._id },
      });
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      UI
  ========================= */
  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-4">Choose Payment Method</h2>

        {["UPI", "Card", "Cash on Delivery"].map((m) => (
          <label key={m} className="flex gap-3 mb-3 cursor-pointer">
            <input
              type="radio"
              checked={method === m}
              onChange={() => setMethod(m)}
            />
            {m}
          </label>
        ))}

        {/*  CARD FORM (ZIP REMOVED) */}
        {method === "Card" && (
          <div className="mt-4 border p-3 rounded">
            <CardElement
              options={{
                hidePostalCode: true, // 🚫 ZIP removed
              }}
            />
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <span className="text-xl font-bold">₹{state.total}</span>

        <button
          disabled={loading}
          onClick={() => {
            if (method === "Card") {
              payWithCard();
            } else {
              payNow();
            }
          }}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
