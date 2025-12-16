
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-gray-500 mb-6">
        Your food is on the way 🍕
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-orange-500 text-white px-6 py-3 rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
