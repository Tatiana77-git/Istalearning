import express from "express";
import cors from "cors";
import productsRoutes from "./routes/productsRoutes"
import customersRoutes from "./routes/customersRoutes"
import paymentsRoutes from "./routes/paymentsRoutes"
import purchasesRoutes from "./routes/purchasesRoutes"

export const app = express();

app.use(cors());
app.use(express.json());


app.use("/products", productsRoutes)
app.use("/customers", customersRoutes)
app.use("/payments", paymentsRoutes)
app.use("/purchases", purchasesRoutes)


app.get("/", (req, res) => {
  res.json({status:"ok"});
});

export default app;