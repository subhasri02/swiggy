

import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />

      <h1 className="text-3xl font-bold mb-2">
        Order Placed Successfully 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for ordering with FoodBite.  
        A confirmation message has been sent to you.
      </p>

      <div className="flex gap-4">
        <Link
          to="/orders"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg"
        >
          View My Orders
        </Link>

        <Link
          to="/"
          className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
