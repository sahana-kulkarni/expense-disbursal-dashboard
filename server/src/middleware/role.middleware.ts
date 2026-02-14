import type { Response, NextFunction } from "express";
import type { AuthedRequest } from "../types/auth";

export function requireRole(allowed: Array<"USER" | "MANAGER" | "ADMIN">) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role) return res.status(401).json({ message: "Unauthorized" });

    if (!allowed.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
