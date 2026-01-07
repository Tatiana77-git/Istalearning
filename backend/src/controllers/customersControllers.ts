import { Request, Response } from "express";
import { pool } from "../config/db"; 



export const getAllCustomers = async (req: Request, res: Response) => {

  try {
    const query = `
      SELECT
        id_customer,
        email,
        phone,
        created_at
      FROM customers
      ORDER BY id_customer ASC
    `;

   const result = await pool.query(query)

   return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Erreur getAllCustomers:", error);

    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des clients",
    });
  }
};
