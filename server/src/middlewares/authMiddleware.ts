import { ClerkClient, verifyToken } from "@clerk/backend";
import { Request, Response, NextFunction } from "express";
import { JWT_KEY } from "../config/env";

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // Securely verify JWT token from Clerk
    const payload = await verifyToken(token, { jwtKey: JWT_KEY });

    // Attach userId to request object
    (req as any).userId = payload.sub;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
