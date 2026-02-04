import express from "express";
import cors from "cors";
import productsRoutes from "./routes/productsRoutes"
import customersRoutes from "./routes/customersRoutes"
import paymentsRoutes from "./routes/paymentsRoutes"
import purchasesRoutes from "./routes/purchasesRoutes"
import { authRoute } from "./routes/authRoutes";


export const app = express();

app.use (
  cors ({
    origin: "http://localhost:5173",
    credentials:true,
  })
);
app.use(express.json());


app.use("/products", productsRoutes)
app.use("/customers", customersRoutes)
app.use("/payments", paymentsRoutes)
app.use("/purchases", purchasesRoutes)
app.use("/auth", authRoute)


app.get("/", (req, res) => {
  res.json({status:"ok"});
});

export default app;