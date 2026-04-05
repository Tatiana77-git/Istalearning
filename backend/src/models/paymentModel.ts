import { pool } from "../config/db";

export const getAllPaymentsModel = async () => {
  const result = await pool.query(`
    SELECT id_payment, currency, amount, status, created_at,
           provider_payment_id, payment_method, purchase_id
    FROM payments
    ORDER BY id_payment ASC
  `);

  return result.rows;
};

export const getPaymentDataForEmail = async (purchaseId: number) => {
  const result = await pool.query(
    `
    SELECT products.test_url, customers.email
    FROM purchases
    JOIN products ON products.id_product = purchases.product_id
    JOIN customers ON customers.id_customer = purchases.customer_id
    WHERE purchases.id_purchase = $1
    `,
    [purchaseId]
  );

  return result.rows[0] || null;
};

export const getPaymentConfirmationData = async (purchaseId: number) => {
  const result = await pool.query(
    `
    SELECT products.test_url
    FROM purchases
    JOIN products ON products.id_product = purchases.product_id
    WHERE purchases.id_purchase = $1
    `,
    [purchaseId]
  );

  return result.rows[0] || null;
};