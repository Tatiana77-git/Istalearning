import { Request, Response } from "express";
import { pool } from "../config/db";


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { lang } = req.query; // получаем ?lang=en

    let query = `
      SELECT
        id_product,
        title,
        level,
        language_code,
        price,
        test_url
      FROM products
    `;

    const values: any[] = [];

    if (typeof req.query.lang === "string") {
      query += " WHERE language_code = $1";
      values.push(req.query.lang.toUpperCase());
    }

    query += " ORDER BY level ASC";

    const result = await pool.query(query, values);

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



export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT
        id_product,
        title,
        level,
        language_code,
        price,
        test_url,
        description
      FROM products
      WHERE id_product = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur getProductById:", error);
    return res.status(500).json({
      success: false,
      message: "Cannot get product",
    });
  }
};