import { Router } from "express";
import { getAllProducts } from "../controllers/productsController";

const router = Router();

router.get("/", getAllProducts);

export default router;
