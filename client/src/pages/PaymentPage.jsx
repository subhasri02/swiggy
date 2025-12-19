


import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  // Prevent direct access + force login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to place order");
      navigate("/signin"); // or home page
      return;
    }

    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const payNow = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to place order");
      navigate("/signin");
      return;
    }

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
          paymentMethod: method,
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
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing order");
    } finally {
      setLoading(false);
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
      </div>

      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <span className="text-xl font-bold">₹{state.total}</span>

        <button
          onClick={payNow}
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
