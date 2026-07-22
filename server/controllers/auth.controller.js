import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import sendEmail from '../utils/sendEmail.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpiry,
    });

    try {
      await sendEmail({
        to: email,
        subject: "Your OTP Code For AI Cold Mail Generator",
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      });
    } catch (error) {
      console.log("Email Error:", error.message);

      await User.findByIdAndDelete(user._id);

      return res.status(500).json({
        message: "Error sending OTP email",
        success: false,
      });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: userResponse,
    });

  } catch (error) {
    console.log("Register Error:", error);

    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: "Required email and otp",
                success: false
            })
        }
        const user = await User.findOne({ email }).select("+otp +otpExpiry");
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({
                message: "Invalid or expired OTP",
                success: false
            })
        }
        user.otp = null;
        user.otpExpiry = null;
        user.isVerified = true;

        if (!user.isVerified) {
            return res.status(400).json({
                message: "Please verify your email first",
                success: false
            })
        }


        await user.save();
        return res.status(200).json({
            message: "OTP verified successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first",
        success: false,
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const userRes = user.toObject();

    delete userRes?.password;
    delete userRes?.otp;
    delete userRes?.otpExpiry;

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: userRes,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Logout successful",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}