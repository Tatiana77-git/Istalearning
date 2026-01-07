import { Request, Response } from "express";
import { pool } from "../config/db"; 



export const getAllPurchases = async (req: Request, res: Response) => {

  try {
    const query = `
      SELECT
        id_purchase,
        status,
        amount,
        currency,
        created_at,
        product_id,
        customer_id
      FROM purchases
      ORDER BY id_purchase ASC
    `;

   const result = await pool.query(query)

   return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Erreur getAllPurchases:", error);

    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de comande",
    });
  }
};
