
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
     🔒 PROTECT ROUTE
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to place order");
      navigate("/signin");
      return;
    }

    if (!state) navigate("/");
  }, [state, navigate]);

  if (!state) return null;

  /*PLACE ORDER (COMMON) */
  const onPaymentSuccess = async (paymentId = null) => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cart,
        totalAmount: state.total,
        paymentMethod: method,
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
  };

  /*  STRIPE CARD PAYMENT */
  const handleCardPayment = async () => {
    if (!stripe || !elements) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login");
      return;
    }

    setLoading(true);

    try {
      /* Create payment intent */
      const res = await fetch(
        "http://localhost:8000/api/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: state.total, // backend converts to paise
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Payment init failed");
        return;
      }

      const { clientSecret } = await res.json();

      /* Confirm card payment */
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
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  /*  PAY NOW*/
  const payNow = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (method === "Card") {
      handleCardPayment();
    } else {
      onPaymentSuccess(); // UPI / COD
    }
  };

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

        {method === "Card" && (
          <div className="mt-4 p-3 border rounded">
            <CardElement options={{ hidePostalCode: true }} />
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <span className="text-xl font-bold">₹{state.total}</span>

        <button
          onClick={payNow}
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
