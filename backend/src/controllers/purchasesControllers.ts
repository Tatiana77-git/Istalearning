import { Request, Response } from "express";
import { pool } from "../config/db"; 
import { AuthRequest } from "../middlewares/authMiddleware";
import { success } from "zod";


export const getAllPurchases = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT purchases.id_purchase, purchases.status, purchases.amount, purchases.currency, purchases.created_at, customers.email AS customer_email \
       FROM purchases \
       JOIN customers ON customers.id_customer = purchases.customer_id \
       ORDER BY purchases.created_at DESC"
    );

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error getAllPurchases:", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch purchases",
    });
  }
};


export const getMyPurchases = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const result = await pool.query(
      "SELECT id_purchase, status, amount, currency, created_at FROM purchases WHERE customer_id = $1 ORDER BY created_at DESC",
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

    if (req.user?.isAdmin) {
      return res.status(403).json ( {
        success:false,
        message:"Admins cannot create purchases",
      })
    }
  
    const userId =req.user!.userId;
    const { product_id} = req.body;

    if (!product_id) {
      return res.status(400).json({
        success:false,
        message:"product_id required"
      });
    }

   
    const product = await pool.query(
      "SELECT price, test_url FROM products WHERE id_product = $1",
      [product_id]
    );

    if (product.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }



    const price = product.rows[0].price;
    const test_url = product.rows[0].test_url;

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
        id_purchase: purchase.rows[0].id_purchase,test_url: test_url
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