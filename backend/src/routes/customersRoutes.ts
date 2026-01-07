import { Router } from "express";

import { getAllCustomers } from "../controllers/customersControllers";

 const router = Router();
 console.log ("bla bla  loaded")

 router.get("/", getAllCustomers);

 export default router;


