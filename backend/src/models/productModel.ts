import { pool } from "../config/db";

export const getAllProductsModel = async (lang?: string) => {
  let query = `
    SELECT id_product, title, level, language_code, price, test_url
    FROM products
  `;

  const values: any[] = [];

  if (lang) {
    query += " WHERE language_code = $1";
    values.push(lang.toUpperCase());
  }

  query += " ORDER BY level ASC";

  const result = await pool.query(query, values);

  return result.rows;
};


export const getProductByIdModel = async (id: string) => {
  const result = await pool.query(
    `
    SELECT id_product, title, level, language_code,
           price, test_url, description
    FROM products
    WHERE id_product = $1
    `,
    [id]
  );

  return result.rows[0] || null;
};