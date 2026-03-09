import { Request, Response, NextFunction } from "express";
import { z } from "zod";


const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  phone: z.string().min(5, "Phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
  if (req.method === "POST" && req.path === "/signup") {
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
    }

    req.body = parsed.data;
  }

  next();
};