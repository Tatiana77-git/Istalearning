import { Request, Response } from "express";
import { pool } from "../config/db";

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT
        id_payment,
        currency,
        amount,
        status,
        created_at,
        provider_payment_id,
        payment_method,
        purchase_id
      FROM payments
      ORDER BY id_payment ASC
    `;

    const result = await pool.query(query);

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Erreur getAllPayments:", error);

    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de paiement",
    });
  }
};
