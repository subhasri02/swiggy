
/* swiggy version */
import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import SignUp from "../pages/SignUpPage";
import { fetchRestaurants } from "../api/swiggyAPI";

export default function FoodDelivery({ /*cartItems, setCartItems*/ }) {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);

  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  // ---------- Banner Data ----------
  const banners = [
    {
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80",
      title: "Delicious Meals Delivered To You",
      subtitle: "Explore a wide variety of dishes from all over the world.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1470&q=80",
      title: "Fresh Ingredients, Great Taste",
      subtitle: "Every dish prepared with the freshest ingredients.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1470&q=80",
      title: "Fast Delivery, Hot Meals",
      subtitle: "Get your favorite meals delivered to your doorstep in no time.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80",
      title: "Taste the World",
      subtitle: "Experience global cuisines without leaving your home.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1543353071-087092ec393b?auto=format&fit=crop&w=1470&q=80",
      title: "Special Offers Every Day",
      subtitle: "Delicious meals at irresistible prices.",
    },
  ];

  // ---------- Auto-slide banners ----------
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ---------- Fetching Swiggy Restaurants ----------
  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true);
      const data = await fetchRestaurants();
      setRestaurants(data);

      const cuisineSet = new Set();
      data.forEach((r) => {
        r.info.cuisines.forEach((cuisine) => cuisineSet.add(cuisine));
      });

      setCategories([{ strCategory: "All" }, ...Array.from(cuisineSet).map((c) => ({ strCategory: c }))]);
      setLoading(false);
    };

    loadRestaurants();
  }, []);

  // ---------- Filter ----------
  const filtered = restaurants.filter((r) => {
    const matchesSearch = r.info.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || r.info.cuisines.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  // ---------- Scroll Categories ----------
  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // ---------- Banner Navigation ----------
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar }
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSignUpClick={() => setShowSignUp(true)}
      />

      {/* ---------- Banner ---------- */}
      <div className="relative w-full h-60 md:h-72 lg:h-80 rounded-lg overflow-hidden mb-6">
        <img
          src={banners[currentBanner].image}
          alt="Banner"
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-50">
          
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12 text-white">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            {banners[currentBanner].title}
          </h1>
          <p className="mb-4 text-sm md:text-lg">{banners[currentBanner].subtitle}</p>
          <button
            className="bg-white text-red-500 font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
            onClick={() => navigate("/cart")}
          >
            Order Now
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentBanner === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ---------- Categories (no images) ---------- */}
      <div className="flex items-center gap-2 px-4 py-4 bg-white shadow-sm rounded-md mb-4">
        <button
          onClick={() => scrollCategories("left")}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <FaArrowLeft />
        </button>

        <div
          ref={categoriesRef}
          className="flex gap-4 overflow-x-auto flex-1 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category.strCategory}
              onClick={() => setActiveCategory(category.strCategory)}
              className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${
                activeCategory === category.strCategory
                  ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.strCategory}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollCategories("right")}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Restaurant Grid */}
      <div className="px-6 mt-6">
        {loading ? (
          <p className="text-center text-gray-500 text-lg py-10">Loading restaurants...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-10">No restaurants found 😔</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((r) => (
              <RestaurantCard key={r.info.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>

      {/* ---------- Footer ---------- */}
      <Footer />
      <BackToTop />

      {/* ---------- SignUp Modal ---------- */}
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
    </div>
  );
}
