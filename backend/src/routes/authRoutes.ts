import  {Router} from "express"
import { signin, signup, forgotPassword, resetPassword} from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";


export const authRoute = Router ();

authRoute.post ( "/signup",validateRequest, signup);
authRoute.post ("/signin", validateRequest, signin);
authRoute.post ("/forgot-password", forgotPassword);
authRoute.post ("/reset-password", resetPassword);



export default authRoute; 