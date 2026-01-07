import { Router } from "express";

import { getAllPurchases } from "../controllers/purchasesControllers";

 const router = Router();

 router.get("/", getAllPurchases);

 export default router;
