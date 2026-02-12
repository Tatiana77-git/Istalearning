import { getAllCustomers } from "../controllers/customersControllers"
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { getAllPurchases } from "../controllers/purchasesControllers";
 
const router = Router();

console.log("Admin routes loaded")

router.get("/customers", authMiddleware,adminMiddleware, getAllCustomers);
router.get("/purchases", authMiddleware, adminMiddleware,
(req, res, next) => {
    console.log("Admin /purchases HIT");
    next();
}, getAllPurchases
);

export default router