import { Router } from "express";
import { getAllPurchases, getMyPurchases, createPurchase } from "../controllers/purchasesControllers";
import { authMiddleware } from "../middlewares/authMiddleware";


 const router = Router();

 router.get("/", getAllPurchases);
 router.get ("/my", authMiddleware, getMyPurchases)
 router.post("/", authMiddleware, createPurchase)



 export default router;
