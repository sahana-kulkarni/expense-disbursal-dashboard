import type { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log(err);
  return res.status(500).json({ message: "Internal Server Error" });
}
