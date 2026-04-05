// import { Request, Response } from "express";
// import { pool } from "../config/db";
// import argon2 from "argon2";


// export const getAllCustomers = async (req: Request, res: Response) => {

//   try {
//     const query = `
//       SELECT
//         id_customer,
//         email,
//         phone,
//         created_at
//       FROM customers
//       ORDER BY id_customer ASC
//     `;

//    const result = await pool.query(query)

//    return res.status(200).json({
//       success: true,
//       data: result.rows,
//     });
//   } catch (error) {
//     console.error("Erreur getAllCustomers:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Erreur lors de la récupération des clients",
//     });
//   }
// };



// export const getCustomerById = async (req:Request, res:Response) => {
//   try {
//     const { id } = req.params;

//     const result = await pool.query(
//       "SELECT id_customer, email, phone, created_at FROM customers WHERE id_customer = $1",
//       [id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Customer not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: result.rows[0],
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to get customer",
//     });
//   }
// };





// // POST customers se connecter 

// export const createCustomer = async (req: Request, res: Response) => {
//   try {
//     const { email, phone, password_hash } = req.body;

//     if (!email || !phone || !password_hash) {
//       return res.status(400).json({
//         success: false,
//         message: "Email, phone and password are required",
//       });
//     }

//     const passwordHash = await argon2.hash(password_hash);

//     const query = `
//       INSERT INTO customers (email, phone, password_hash, created_at)
//       VALUES ($1, $2, $3, CURRENT_DATE)
//       RETURNING id_customer, email, phone, created_at
//     `;

//     const result = await pool.query(query, [
//       email,
//       phone,
//       passwordHash,
//     ]);

//     return res.status(201).json({
//       success: true,
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     if (error.code === "23505") {
//       return res.status(409).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Cannot create customer",
//     });
//   }
// };

import { Request, Response } from "express";
import argon2 from "argon2";
import { getAllCustomersModel } from "../models/customerModel";
import { getCustomerByIdModel } from "../models/customerModel";
import { createCustomerModel } from "../models/customerModel";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getAllCustomersModel();

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des clients",
    });
  }
};



export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const customer = await getCustomerByIdModel(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to get customer",
    });
  }
};




export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { email, phone, password_hash } = req.body;

    if (!email || !phone || !password_hash) {
      return res.status(400).json({
        success: false,
        message: "Email, phone and password are required",
      });
    }

    const passwordHash = await argon2.hash(password_hash);

    const customer = await createCustomerModel(
      email,
      phone,
      passwordHash
    );

    return res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Cannot create customer",
    });
  }
};