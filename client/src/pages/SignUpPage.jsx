
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.js"; //  correct import path

export default function SignUp({ onClose }) {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const serverUrl = "http://localhost:8000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSignUp = async () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = { ...formData, role };

        await axios.post(`${serverUrl}/api/auth/signup`, payload);

        setSuccess("Account created successfully! 🎉");
        setFormData({ fullName: "", email: "", mobile: "", password: "" });

        setTimeout(() => {
          if (onClose) onClose();
          navigate("/signIn");
        }, 1500);
      } catch (error) {
        console.error("Sign-up error:", error);

        if (error.response?.data?.message) {
          setErrors({ general: error.response.data.message });
        } else {
          setErrors({ general: "Something went wrong. Please try again." });
        }
      }
    }
  };

  // Google authentication
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google Auth result:", result.user);
    } catch (error) {
      console.error("Google sign-in error:", error);
      setErrors({ general: "Google sign-in failed. Please try again." });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="flex justify-center items-center min-h-screen py-10 px-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
          style={{ border: `1px solid ${borderColor}` }}
        >
          <h1
            className="text-3xl font-bold mb-2 text-center"
            style={{ color: primaryColor }}
          >
            FoodBite
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Create your account to enjoy delicious deliveries
          </p>

          {success && (
            <p className="text-green-600 text-center font-medium mb-3">
              {success}
            </p>
          )}
          {errors.general && (
            <p className="text-red-500 text-center font-medium mb-3">
              {errors.general}
            </p>
          )}

          <InputField
            label="Full Name"
            name="fullName"
            placeholder="Enter your Full Name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <InputField
            label="Email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            type="email"
          />

          <InputField
            label="Mobile"
            name="mobile"
            placeholder="Enter your Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            error={errors.mobile}
            type="tel"
          />

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500 transition"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-orange-500 transition"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <div className="flex gap-2">
              {["user", "owner", "deliveryBoy"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-all duration-200 transform hover:scale-105 ${
                    role === r
                      ? "bg-orange-500 text-white border-orange-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSignUp}
            className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-full font-semibold hover:from-orange-500 hover:to-red-600 transition mt-4 transform hover:scale-105"
          >
            Sign Up
          </button>

          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-2 border rounded-md py-2 mt-3 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-lg" />
            Sign up with Google
          </button>

          <p
            className="text-center mt-4 text-gray-700"
            onClick={() => navigate("/signIn")}
          >
            Already have an account?{" "}
            <span className="text-orange-500 font-medium cursor-pointer hover:underline">
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 transition"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
