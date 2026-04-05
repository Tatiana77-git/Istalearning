import { getAllPurchasesModel } from "../models/purchaseModel";
import { getPurchasesByUserModel } from "../models/purchaseModel";
import { getProductForPurchase, createPurchaseModel,} from "../models/purchaseModel";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Response } from "express";


export const getAllPurchases = async (req: AuthRequest, res: Response) => {
  try {
    const purchases = await getAllPurchasesModel();

    return res.status(200).json({
      success: true,
      data: purchases,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot fetch purchases",
    });
  }
};


export const getMyPurchases = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const purchases = await getPurchasesByUserModel(userId);

    return res.status(200).json({
      success: true,
      data: purchases,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Cannot fetch purchases",
    });
  }
};


export const createPurchase = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admins cannot create purchases",
      });
    }

    const userId = req.user!.userId;
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: "product_id required",
      });
    }

    const product = await getProductForPurchase(product_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const purchase = await createPurchaseModel(
      product.price,
      product_id,
      userId
    );

    return res.status(201).json({
      success: true,
      data: {
        id_purchase: purchase.id_purchase,
        test_url: product.test_url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create purchase",
    });
  }
};