import { Router } from "express";

import { createCustomer, getAllCustomers, getCustomerById } from "../controllers/customersControllers";

 const router = Router();


 router.get("/", getAllCustomers);
 router.get ("/:id", getCustomerById)
 router.post("/", createCustomer)

 export default router;


