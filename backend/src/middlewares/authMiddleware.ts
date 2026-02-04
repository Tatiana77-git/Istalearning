import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
  user?: {
    userId:number;
  };
}
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

    console.log(" auth middleware called");
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.BACKEND_JWT_SECRET as string
    ) as {userId:number};

    req.user = decoded; // ✅ ТИПИЗИРОВАНО
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};