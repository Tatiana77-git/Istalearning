import { Request, Response } from "express";
import { pool } from "../config/db";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT
        id_product,
        title,
        level,
        language_code,
        price,
        test_url
      FROM products
      ORDER BY id_product ASC
    `;

    const result = await pool.query(query);

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Erreur getAllProducts:", error);

    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits",
    });
  }
};
