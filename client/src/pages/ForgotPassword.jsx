// in terminal we get OTP

// import React from 'react'
// import { useState } from 'react';
// import {IoIosArrowRoundBack} from 'react-icons/io';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { serverUrl } from "../config";



// function ForgotPassword ()  {
//     const [step, setStep] = useState(1); // 1: enter email, 2: enter otp and new password
//     const [email, setEmail] = useState('');
//     const [otp,setOtp] = useState('');
//     const [NewPassword,setNewPassword] = useState('');
//     const [ConfirmPassword,setConfirmPassword] = useState('');
//     const navigate = useNavigate()

//     //Handle function for step1 from backend we are getting 

//     const handleSendOtp=async()=>{
//         try{
//             const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{email},
//             {withCredentials:true})
//             console.log(result)

//             setStep(1)
//         } catch(error) {

//         }
//     }


//     const handleVerifyOtp=async()=>{
//         try{
//             const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},
//             {withCredentials:true})
//             console.log(result)

//             setStep(2)
//         } catch(error) {

//         }
//     }

//     const handleResetPassword=async()=>{
//         if(NewPassword!=ConfirmPassword){
//             return null
//         }
//         try{
//             const result = await axios.post(`${serverUrl}/api/auth/reset-otp`,{email,NewPassword},
//             {withCredentials:true})
//             console.log(result)
//             navigate("/signin")
//             setStep(3)
//         } catch(error) {

//         }
//     }

//   return (
//     <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
//         <div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-md p-8'>
//             <div className="flex items-center gap-4 mb-4">
//                 <IoIosArrowRoundBack size={30} className="text-[#ff4d2d]" 
//                 onClick={"/signin"}/>
//             <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">Forgot Password</h1>
//             </div>

//             {step==1 
//             && 
//                 <div>
//                 <div className='mb-6'>
//                     <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
//                     <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2
//                     focus:outline-none' placeholder="Enter your Email"
//                     onChange={(e)=>setEmail(e.target.value)} value={email}/>
//                     </div>
//                     <button className={`w-full font-semibold py-2 rounded-lg
//                     transition duration-200 bg-[#ff4d2d] text-white
//                     [#e64323] cursor-pointer`} onClick={handleSendOtp}>
//                         Send Otp
//                     </button>
                
//                 </div>}

            
//             {step==2 
//             && 
//                 <div>
//                 <div className='mb-6'>
//                     <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>OTP</label>
//                     <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2
//                     focus:outline-none' placeholder="Enter OTP"
//                     onChange={(e)=>setOtp(e.target.value)} value={otp}/>
//                     </div>
//                     <button className={`w-full font-semibold py-2 rounded-lg
//                     transition duration-200 bg-[#ff4d2d] text-white
//                     [#e64323] cursor-pointer`} onClick={handleVerifyOtp}>
//                         Verify 
//                     </button>
                
//                 </div>}

//             {step==3 
//             && 
//                 <div>
//                 <div className='mb-6'>
//                     <label htmlFor="NewPassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
//                     <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2
//                     focus:outline-none' placeholder="Enter New Password"
//                     onChange={(e)=>setNewPassword(e.target.value)} value={NewPassword}/>
//                     </div>
//                     <div className='mb-6'>
//                     <label htmlFor="ConfirmPassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
//                     <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2
//                     focus:outline-none' placeholder="Confirm Password"
//                     onChange={(e)=>setConfirmPassword(e.target.value)} value={ConfirmPassword}/>
//                     </div>
//                     <button className={`w-full font-semibold py-2 rounded-lg
//                     transition duration-200 bg-[#ff4d2d] text-white
//                     [#e64323] cursor-pointer`} onClick={handleResetPassword}>
//                         Reset Password
//                     </button>
                
//                 </div>}

//         </div>
//     </div>
//   )
// }
// export default ForgotPassword



/*
email,otp,new password => submit

*/

// new one 

import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../config";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); 
  const navigate = useNavigate();

  // Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      setMessage({ text: "Please enter your email.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(res.data);
      setMessage({ text: "OTP sent successfully to your email!", type: "success" });
      setStep(2);
    } catch (err) {
      console.error(err);
      setMessage({
        text: err.response?.data?.message || "Failed to send OTP",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage({ text: "Please enter OTP.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(res.data);
      setMessage({ text: "OTP verified successfully!", type: "success" });
      setStep(3);
    } catch (err) {
      console.error(err);
      setMessage({
        text: err.response?.data?.message || "Invalid or expired OTP",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(res.data);
      setMessage({ text: "Password reset successful!", type: "success" });

      // Redirect after success message
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage({
        text: err.response?.data?.message || "Failed to reset password",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        {/* Back Button + Title */}
        <div className="flex items-center gap-2 mb-6">
          <IoIosArrowRoundBack
            size={32}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-[#ff4d2d]">Forgot Password</h1>
        </div>

        {/* Message Display */}
        {message.text && (
          <p
            className={`text-center mb-4 font-medium ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* STEP 1 — Enter Email */}
        {step === 1 && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full font-semibold py-2 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323] disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* STEP 2 — Verify OTP */}
        {step === 2 && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full font-semibold py-2 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323] disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* STEP 3 — Reset Password */}
        {step === 3 && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full font-semibold py-2 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323] disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
