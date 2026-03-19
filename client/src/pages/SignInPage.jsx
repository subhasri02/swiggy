import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function SignInPage({ onClose }) {
  const [mode, setMode] = useState("phone"); // phone | email | register | forgot
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const serverUrl = "http://localhost:8000";

  const closeModal = () => {
    onClose?.();
    navigate("/");
  };

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    const { fullName, email, password, mobile } = formData;

    if (!fullName || !email || !password || !mobile) {
      return setMessage({ text: "All fields are required", type: "error" });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return setMessage({
        text: "Mobile number must be exactly 10 digits",
        type: "error",
      });
    }

    try {
      setLoading(true);

      const res = await axios.post(`${serverUrl}/api/auth/signup`, formData);

      login(res.data.user, res.data.token);

      setMessage({
        text: "Account created successfully 🎉",
        type: "success",
      });

      setTimeout(closeModal, 1000);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Signup failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= EMAIL LOGIN ================= */
  const handleEmailLogin = async () => {
    if (!formData.email || !formData.password) {
      return setMessage({
        text: "Email & password required",
        type: "error",
      });
    }

    try {
      setLoading(true);

      const res = await axios.post(`${serverUrl}/api/auth/signin`, {
        email: formData.email,
        password: formData.password,
      });

      login(res.data.user, res.data.token);

      setMessage({ text: "Login successful", type: "success" });

      setTimeout(closeModal, 1000);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Invalid credentials",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORGOT PASSWORD ================= */
  const handleForgotPassword = async () => {
    if (!formData.email) {
      return setMessage({
        text: "Please enter your registered email",
        type: "error",
      });
    }

    try {
      setLoading(true);

      await axios.post(`${serverUrl}/api/auth/forgot-password`, {
        email: formData.email,
      });

      setMessage({
        text: "Password reset link sent to your email",
        type: "success",
      });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Email not registered",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = () => {
    setMessage({
      text: "Google login not supported yet",
      type: "error",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative p-6">
        <button
          onClick={closeModal}
          className="absolute top-4 left-4 text-xl text-gray-600 hover:text-orange-500"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-3xl font-bold mb-5 text-orange-500 text-center">
          {mode === "register"
            ? "Create Account"
            : mode === "forgot"
            ? "Forgot Password"
            : "Login"}
        </h1>

        {message.text && (
          <p
            className={`text-center mb-4 ${
              message.type === "success"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* ================= REGISTER ================= */}
        {mode === "register" && (
          <>
            <input
              placeholder="Full Name"
              className="w-full border rounded-lg px-3 py-2 mb-3"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2 mb-3"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              placeholder="Mobile Number"
              className="w-full border rounded-lg px-3 py-2 mb-3"
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-3 py-2 mb-3"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <button
              onClick={() => setMode("email")}
              className="w-full mt-3 underline"
            >
              Already have an account? Login
            </button>
          </>
        )}

        {/* ================= EMAIL LOGIN ================= */}
        {mode === "email" && (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2 mb-3"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border rounded-lg px-3 py-2"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <p
              className="text-right text-sm text-orange-500 cursor-pointer mb-3"
              onClick={() => setMode("forgot")}
            >
              Forgot Password?
            </p>

            <button
              onClick={handleEmailLogin}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              onClick={() => setMode("register")}
              className="w-full mt-3 underline"
            >
              Create new account
            </button>
          </>
        )}

        {/* ================= FORGOT PASSWORD ================= */}
        {mode === "forgot" && (
          <>
            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full border rounded-lg px-3 py-2 mb-3"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <button
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-md"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              onClick={() => setMode("email")}
              className="w-full mt-3 underline"
            >
              Back to Login
            </button>
          </>
        )}

        {/* ================= DEFAULT ================= */}
        {mode === "phone" && (
          <>
            <button
              onClick={() => setMode("email")}
              className="w-full border py-2 rounded-md flex justify-center gap-2"
            >
              <MdEmail /> Continue with Email
            </button>

            <button
              onClick={handleGoogleLogin}
              className="w-full border py-2 rounded-md mt-3 flex justify-center gap-2"
            >
              <FcGoogle /> Sign in with Google
            </button>

            <p className="text-center text-sm mt-4">
              New to FoodBite?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-orange-500 font-medium"
              >
                Create account
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}


