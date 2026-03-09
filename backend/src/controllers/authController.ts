import { Request, Response } from "express";
import { pool } from "../config/db";
import argon2 from "argon2";
import { signRefreshToken } from "../services/TokenService";





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

 
    const result = await pool.query(
      `
      INSERT INTO customers (email, phone, password_hash, created_at)
      VALUES ($1, $2, $3, CURRENT_DATE)
      RETURNING id_customer, email, phone, created_at
      `,
      [email, phone, passwordHash]
    );

  
    return res.status(201).json({
      success: true,
      data: result.rows[0],
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



//SIGNIN


export const signin = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

  
    const result = await pool.query(
      "SELECT id_customer, password_hash, is_admin FROM customers WHERE email = $1",
      [email]
    );


    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];


    const ok = await argon2.verify(user.password_hash, password);

    if (!ok) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // JWT
 

const token = signRefreshToken({
  userId: user.id_customer,
  isAdmin: user.is_admin, 
});
 
return res.status(200).json({
  success: true,
  token,
});

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Signin failed",
    });
  }



};