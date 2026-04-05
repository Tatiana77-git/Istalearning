import { pool } from "../config/db";

export const getAllPurchasesModel = async () => {
  const result = await pool.query(`
    SELECT purchases.id_purchase, purchases.status, purchases.amount,
           purchases.currency, purchases.created_at,
           customers.email AS customer_email
    FROM purchases
    JOIN customers ON customers.id_customer = purchases.customer_id
    ORDER BY purchases.created_at DESC
  `);

  return result.rows;
};

export const getPurchasesByUserModel = async (userId: number) => {
  const result = await pool.query(
    `
    SELECT id_purchase, status, amount, currency, created_at
    FROM purchases
    WHERE customer_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

export const getProductForPurchase = async (productId: number) => {
  const result = await pool.query(
    `
    SELECT price, test_url
    FROM products
    WHERE id_product = $1
    `,
    [productId]
  );

  return result.rows[0] || null;
};

export const createPurchaseModel = async (
  price: number,
  productId: number,
  userId: number
) => {
  const result = await pool.query(
    `
    INSERT INTO purchases (status, amount, currency, created_at, product_id, customer_id)
    VALUES ($1, $2, $3, CURRENT_DATE, $4, $5)
    RETURNING id_purchase
    `,
    ["PENDING", price, "EUR", productId, userId]
  );

  return result.rows[0];
};