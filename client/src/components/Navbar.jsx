
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ searchQuery = "", setSearchQuery }) {
  const [location, setLocation] = useState("Hyderabad");
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    clearCart(); // 🔥 optional but recommended
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold text-orange-500">
        FoodBite
      </Link>

      {/* LOCATION + SEARCH */}
      <div className="flex items-center gap-4 flex-1 mx-6">
        <div
          className="flex items-center gap-2 border px-3 py-2 rounded-full cursor-pointer"
          onClick={() => setIsEditingLocation(true)}
        >
          <FaMapMarkerAlt />
          {isEditingLocation ? (
            <>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="outline-none w-20"
              />
              <FaTimes
                className="cursor-pointer"
                onClick={() => setIsEditingLocation(false)}
              />
            </>
          ) : (
            <span>{location}</span>
          )}
        </div>

        {/* SEARCH (safe even if props not passed) */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full flex-1">
          <FaSearch />
          <input
            className="bg-transparent outline-none ml-2 flex-1"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery && setSearchQuery(e.target.value)
            }
          />
        </div>
      </div>

      {/* CART */}
      <button
        onClick={() => navigate("/cart")}
        className="relative bg-orange-500 text-white px-4 py-2 rounded-full"
      >
        <FaShoppingCart />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* ADMIN DASHBOARD (ONLY ADMIN) */}
      {user?.role === "admin" && (
        <Link
          to="/admin/orders"
          className="ml-3 px-4 py-2 border border-green-600 text-green-600 rounded-full"
        >
          Admin
        </Link>
      )}

      {/* LOGIN / LOGOUT */}
      {user ? (
        <button
          onClick={handleLogout}
          className="ml-3 px-4 py-2 border border-red-500 text-red-500 rounded-full"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/signin")}
          className="ml-3 px-4 py-2 border border-orange-500 text-orange-500 rounded-full"
        >
          Login
        </button>
      )}
    </header>
  );
}
