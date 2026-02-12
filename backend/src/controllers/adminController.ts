import { Request, Response } from "express";
import { pool } from "../config/db";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id_customer, email, phone, created_at
      FROM customers
      ORDER BY id_customer DESC
    `);

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Admin getAllCustomers error:", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch customers",
    });
  }
};