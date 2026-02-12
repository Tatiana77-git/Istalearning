// TokenService.ts
// jsonwebtoken typings are broken → use require on purpose
const jwt = require("jsonwebtoken");

export const signRefreshToken = (payload: { userId: number; isAdmin: boolean}): string => {
  const secret = process.env.BACKEND_JWT_SECRET;
  const ttl = process.env.BACKEND_JWT_RT_TTL || "7d";

  if (!secret) {
    throw new Error("JWT secret not defined");
  }

  return jwt.sign(payload, secret, { expiresIn: ttl });
};