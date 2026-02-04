import { Request, Response } from "express";
import { pool } from "../config/db"; 
import { AuthRequest } from "../middlewares/authMiddleware";




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




// get getMyPurchases montrer les achats 


export const getMyPurchases = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const result = await pool.query(
      `
      SELECT
        id_purchase,
        status,
        amount,
        currency,
        created_at,
        product_id
      FROM purchases
      WHERE customer_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error getMyPurchases:", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch purchases",
    });
  }
};








// POST purchses acheter le test 

export const createPurchase = async (req:AuthRequest, res:Response) => {
  try {
  
    const userId =req.user!.userId;
    const { product_id} = req.body;

    if (!product_id) {
      return res.status(400).json({
        success:false,
        message:"product_id required"
      });
    }

    // 1. получаем продукт
    const product = await pool.query(
      "SELECT price FROM products WHERE id_product = $1",
      [product_id]
    );

    if (product.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }


    const customer = await pool.query(
  "SELECT id_customer FROM customers WHERE id_customer = $1",
  [userId]
);

if (customer.rowCount === 0) {
  return res.status(404).json({
    success: false,
    message: "Customer not found",
  });
}

    const price = product.rows[0].price;

    // 2. создаём purchase
    const purchase = await pool.query(
      `
      INSERT INTO purchases (status, amount, currency, created_at, product_id, customer_id)
      VALUES ($1, $2, $3, CURRENT_DATE, $4, $5)
      RETURNING id_purchase
      `,
      ["PENDING", price, "EUR", product_id, userId]
    );

    return res.status(201).json({
      success: true,
      data: {
        id_purchase: purchase.rows[0].id_purchase,
      },
    });
  } catch (error) {
    console.error("Error creating purchase:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create purchase",
    });
  }
};