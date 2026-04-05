import { pool } from "../config/db";

export const createCustomer = async (
  email: string,
  phone: string,
  passwordHash: string
) => {
  const result = await pool.query(
    `
    INSERT INTO customers (email, phone, password_hash, created_at)
    VALUES ($1, $2, $3, CURRENT_DATE)
    RETURNING id_customer, email, phone, created_at
    `,
    [email, phone, passwordHash]
  );

  return result.rows[0];
};

export const findCustomerByEmail = async (email: string) => {
  const result = await pool.query(
    `
    SELECT id_customer, email, phone, password_hash, is_admin, reset_token
    FROM customers
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0] || null;
};

export const saveResetToken = async (
  customerId: number,
  resetToken: string
) => {
  await pool.query(
    `
    UPDATE customers
    SET reset_token = $1
    WHERE id_customer = $2
    `,
    [resetToken, customerId]
  );
};

export const findCustomerByResetToken = async (token: string) => {
  const result = await pool.query(
    `
    SELECT id_customer
    FROM customers
    WHERE reset_token = $1
    `,
    [token]
  );

  return result.rows[0] || null;
};

export const updateCustomerPassword = async (
  customerId: number,
  passwordHash: string
) => {
  await pool.query(
    `
    UPDATE customers
    SET password_hash = $1,
        reset_token = NULL
    WHERE id_customer = $2
    `,
    [passwordHash, customerId]
  );
};