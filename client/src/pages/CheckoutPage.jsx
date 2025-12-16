
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const continuePayment = () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    navigate("/payment", {
      state: { address, total },
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">Delivery Address</h2>
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-orange-400"
          placeholder="House no, Street, Area, City"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <span className="text-xl font-bold">₹{total}</span>
        <button
          onClick={continuePayment}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
