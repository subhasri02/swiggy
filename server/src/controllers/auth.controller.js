import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (!mobile || mobile.length < 10) {
      return res.status(400).json({ message: "Mobile number must be at least 10 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
    httpOnly: true,
    secure: false,     // true only in production (https)
    sameSite: "lax",   //  THIS FIXES YOUR ISSUE
    maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Signup error", error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Signin error", error: error.message });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Signout successful" });
  } catch (error) {
    console.error("Signout error:", error);
    return res.status(500).json({ message: "Signout error", error: error.message });
  }
}

/* controller for sending otp by using node mailer*/

export const sendOtp=async (req,res) => {
  try{
    const {email}=req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"User doesnt exists."})
    }
    const otp=Math.floor(1000 + Math.random() * 9000).toString() // for generating the otp 6 digit 
    user.resetOtp=otp 
    user.otpExpires=Date.now()+5*60*1000
    user.isOtpVerified=false
    await user.save()
    await sendOtpMail(email,otp)
    return res.status(200).json({message:"Otp sent successfully.."})
  } catch(error){
    return res.status(500).json(`send otp error ${error}`)
  }
}

export const verifyOtp=async(req,res) => {
  try {
    const {email,otp} = req.body
    const user=await User.findOne({email})
    if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()){
        return res.status(400).json({message:"Invalid/expired Otp"})
    } 
    user.isOtpVerified=true
    user.resetOtp=undefined
    user.otpExpires=undefined
    await user.save()
    return res.status(200).json({message:"Otp verified successfully."})
  } catch (error) {
    return res.status(500).json(`verify otp error ${error}`)
  }
}
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Server error during password reset" });
  }
};


