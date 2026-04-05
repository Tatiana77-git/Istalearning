import { Request, Response } from "express";
import { getAllProductsModel } from "../models/productModel";
import { getProductByIdModel } from "../models/productModel";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const lang = typeof req.query.lang === "string" ? req.query.lang : undefined;

    const products = await getAllProductsModel(lang);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits",
    });
  }
};



export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const product = await getProductByIdModel(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Cannot get product",
    });
  }
};