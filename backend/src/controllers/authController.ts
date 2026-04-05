
import { Request, Response } from "express";
import argon2 from "argon2";
import { signRefreshToken } from "../services/TokenService";
import {
  createCustomer,
  findCustomerByEmail,
  saveResetToken,
  findCustomerByResetToken,
  updateCustomerPassword,
} from "../models/customerModel";

// SIGNUP
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, phone } = req.body;

    if (!email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "email, phone and password are required",
      });
    }

    const passwordHash = await argon2.hash(password);

    const user = await createCustomer(email, phone, passwordHash);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Cannot signup user",
    });
  }
};

// SIGNIN
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await findCustomerByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const ok = await argon2.verify(user.password_hash, password);

    if (!ok) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = signRefreshToken({
      userId: user.id_customer,
      isAdmin: user.is_admin,
    });

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({
      success: false,
      message: "Signin failed",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const user = await findCustomerByEmail(email);

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If email exists, reset link generated",
      });
    }

    const resetToken = Math.random().toString(36).substring(2);

    await saveResetToken(user.id_customer, resetToken);

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    console.log("Reset link:", resetLink);

    return res.status(200).json({
      success: true,
      message: "Reset link generated",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password required",
      });
    }

    const user = await findCustomerByResetToken(token);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    const passwordHash = await argon2.hash(password);

    await updateCustomerPassword(user.id_customer, passwordHash);

    return res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};