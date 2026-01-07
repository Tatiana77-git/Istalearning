import { Router } from "express";

import { getAllPayments } from "../controllers/paymentsControllers";

 const router = Router();

 router.get("/", getAllPayments);

 export default router;
