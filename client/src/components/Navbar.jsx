
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [location, setLocation] = useState("Hyderabad");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const navigate = useNavigate();

  const { cart } = useCart();

  //  TOTAL ITEMS IN CART
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-md px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-orange-500">FoodBite</h1>
      </Link>

      {/* Location & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl mt-2 md:mt-0">
        {/* Location */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 shadow-sm cursor-pointer hover:shadow-md transition bg-white"
          onClick={() => setIsEditingLocation(true)}
        >
          <FaMapMarkerAlt className="text-red-500 text-lg" />

          {isEditingLocation ? (
            <>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="outline-none text-gray-700 font-medium w-24"
                autoFocus
              />
              <FaTimes
                className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingLocation(false);
                }}
              />
            </>
          ) : (
            <span className="font-medium text-gray-700">{location}</span>
          )}
        </div>

        {/* Search */}
        <div className="flex items-center flex-1 rounded-full px-4 py-2 bg-gray-100 shadow-sm hover:shadow-md transition">
          <FaSearch className="text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search for restaurant or dish"
            className="flex-1 ml-3 outline-none bg-transparent text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex gap-3 mt-2 md:mt-0 items-center">
        {/* 🛒 CART WITH BADGE */}
        <button
          onClick={() => navigate("/cart")}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full text-white bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 transition shadow-lg font-semibold"
        >
          <FaShoppingCart />

          {/* BADGE */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}

          Cart
        </button>

        {/* Login */}
        <button
          onClick={() => navigate("/signin")}
          className="px-4 py-2 rounded-full font-semibold text-orange-500 border border-orange-500 hover:bg-orange-50 transition shadow-sm"
        >
          Login
        </button>
      </div>
    </header>
  );
}
