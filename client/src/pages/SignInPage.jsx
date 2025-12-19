
// //working good but need some modifications for mobile otp


// import React, { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { MdEmail } from "react-icons/md";
// import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function SignInPage({ onClose }) {
//   const [mode, setMode] = useState("phone"); // "phone" or "email"
//   // steps for mobile login
//   const [step, setStep] = useState(1);
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const serverUrl = "http://localhost:8000";

//   // 🔹 Go back or close modal
//   const handleClose = () => {
//     if (onClose) onClose();
//     navigate("/");
//   };

//   // Handle OTP send
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!/^\d{10}$/.test(phone)) {
//       setMessage({ text: "Please enter a valid 10-digit phone number.", type: "error" });
//       return;
//     }

//     setLoading(true);
//     setMessage({ text: "", type: "" });
//     try {
//       await new Promise((res) => setTimeout(res, 1500));
//       setMessage({ text: `OTP sent successfully to +91 ${phone}`, type: "success" });
//       // newly added
//       setStep(2);

//     } catch {
//       setMessage({ text: "Failed to send OTP. Please try again.", type: "error" });
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage({ text: "", type: "" }), 3000);
//     }
//   };

//   // new add on 

//   // Verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (!otp) {
//       setMessage({ text: "Please enter the OTP.", type: "error" });
//       return;
//     }

//     setLoading(true);
//     setMessage({ text: "", type: "" });
//     try {
//       const res = await axios.post(`${serverUrl}/api/auth/verify-otp`, {
//         phone,
//         otp,
//       });

//       // Save token and navigate to home
//       localStorage.setItem("token", res.data.token);
//       setMessage({ text: "OTP verified successfully! Logging you in...", type: "success" });

//       setTimeout(() => {
//         if (onClose) onClose();
//         navigate("/");
//       }, 1500);
//     } catch (err) {
//       console.error(err);
//       setMessage({
//         text: err.response?.data?.message || "Invalid or expired OTP.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage({ text: "", type: "" }), 3000);
//     }
//   };

//   // Handle Email Sign-In
//   const handleEmailSignIn = async () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     try {
//       const res = await axios.post(`${serverUrl}/api/auth/signin`, formData);
//       localStorage.setItem("token", res.data.token);
//       setMessage({ text: "Signed in successfully! 🎉", type: "success" });
//       setTimeout(() => {
//         if (onClose) onClose();
//         navigate("/");
//       }, 1500);
//     } catch (err) {
//       setErrors({ general: err.response?.data?.message || "Invalid credentials" });
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//       <div
//         className={`bg-white rounded-xl shadow-xl w-full max-w-md relative p-6 transform transition-all duration-300 ${
//           mode === "email" ? "animate-slideIn" : "animate-fadeIn"
//         }`}
//       >
//         {/* Back / Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-4 left-4 text-gray-600 hover:text-orange-500 text-xl"
//         >
//           <FaArrowLeft />
//         </button>

//         <h1 className="text-3xl font-bold mb-6 text-orange-500 text-center">Login</h1>

//         {/* Message Box */}
//         {message.text && (
//           <p
//             className={`text-center mb-4 font-medium ${
//               message.type === "success" ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {message.text}
//           </p>
//         )}
//             {/* ================= PHONE LOGIN ================= */}
//         {mode === "phone" && (
//           <>
//             {/* Step 1: Send OTP */}
//             {step === 1 && (
//               <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
//                 <div className="flex items-center border rounded-lg overflow-hidden">
//                   <span className="bg-gray-100 px-3 py-2 text-gray-700 border-r">🇮🇳 +91</span>
//                   <input
//                     type="tel"
//                     placeholder="Enter phone number"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="flex-1 px-3 py-2 outline-none"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition disabled:opacity-50"
//                 >
//                   {loading ? "Sending OTP..." : "Send One Time Password"}
//                 </button>
//               </form>
//             )}

//             {/* Step 2: Verify OTP */}
//             {step === 2 && (
//               <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full border rounded-lg px-3 py-2 focus:outline-none"
//                 />

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition disabled:opacity-50"
//                 >
//                   {loading ? "Verifying OTP..." : "Verify OTP & Login"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setStep(1)}
//                   className="text-sm text-gray-500 underline hover:text-orange-500"
//                 >
//                   ← Back to phone entry
//                 </button>
//               </form>
//             )}
            

//             {/* Divider */}
//             <div className="flex items-center my-4">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="mx-3 text-gray-500 text-sm">or</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             {/* Continue with Email */}
//             <button
//               onClick={() => setMode("email")}
//               className="w-full flex items-center justify-center gap-2 border rounded-md py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
//             >
//               <MdEmail className="text-orange-500 text-lg" />
//               Continue with Email
//             </button>

//             {/* Google Sign-In */}
//             <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 mt-3 font-medium text-gray-700 hover:bg-gray-100 transition">
//               <FcGoogle className="text-lg" />
//               Sign in with Google
//             </button>

//             {/* Footer */}
//             <p className="text-center text-sm text-gray-600 mt-5">
//               New to FoodBite?{" "}
//               <button
//                 type="button"
//                 onClick={() => {
//                   navigate("/signup");
//                   if (onClose) onClose();
//                 }}
//                 className="text-orange-500 font-medium hover:underline"
//               >
//                 Create account
//               </button>
//             </p>
//           </>
//         )}

//         {/* ========== EMAIL LOGIN ========== */}
//         {mode === "email" && (
//           <>
//             <h2 className="text-lg font-semibold text-center text-gray-700 mb-3">
//               Sign in with Email
//             </h2>

//             {errors.general && (
//               <p className="text-red-500 text-center mb-2">{errors.general}</p>
//             )}

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your Email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 transition"
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-1">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your Password"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500 transition"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-2.5 text-gray-500 hover:text-orange-500 transition"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 >
//                   {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//               <p
//                 className="text-right text-sm text-orange-500 font-medium mt-2 cursor-pointer hover:underline"
//                 onClick={() => navigate("/forgot-password")}
//               >
//                 Forgot Password?
//               </p>
//             </div>

//             <button
//               onClick={handleEmailSignIn}
//               className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition"
//             >
//               Sign In
//             </button>

//             <button
//               onClick={() => setMode("phone")}
//               className="w-full mt-4 text-sm text-gray-600 underline hover:text-orange-500"
//             >
//               ← Back to phone login
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

//  Firebase imports
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function SignInPage({ onClose }) {
  const [mode, setMode] = useState("phone"); // phone | email | register
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

  /* REGISTER */
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

      setMessage({ text: "Account created successfully 🎉", type: "success" });
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

  /* EMAIL LOGIN  */
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

  /*  GOOGLE LOGIN (FIXED)  */
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      //  Firebase popup
      const result = await signInWithPopup(auth, googleProvider);

      const userData = {
        fullName: result.user.displayName,
        email: result.user.email,
      };

      //  Backend JWT creation
      const res = await axios.post(
        `${serverUrl}/api/auth/google-login`,
        userData
      );

      login(res.data.user, res.data.token);

      setMessage({ text: "Google login successful 🎉", type: "success" });
      setTimeout(closeModal, 1000);
    } catch (error) {
      console.error(error);
      setMessage({
        text: "Google login failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
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
          {mode === "register" ? "Create Account" : "Login"}
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

        {/* REGISTER */}
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

        {/* EMAIL LOGIN */}
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

        {/* DEFAULT */}
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
              disabled={loading}
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
