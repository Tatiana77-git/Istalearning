import { Router } from "express";

import { confirmPayment, createStripeSession, getAllPayments, stripeWebhook, } from "../controllers/paymentsControllers";

 const router = Router();

 router.get("/", getAllPayments);
 router.post("/create-session", createStripeSession);
 router.post ("/webhook", stripeWebhook);
 router.post("/confirm", confirmPayment);


 export default router;
