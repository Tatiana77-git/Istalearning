import  {Router} from "express"
import { signin, signup } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";

export const authRoute = Router ();

authRoute.post ( "/signup",validateRequest, signup);
authRoute.post ("/signin", validateRequest, signin)

export default authRoute; 