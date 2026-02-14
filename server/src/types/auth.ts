import type { Request } from "express";

export type AuthUser = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
  role: "USER" | "MANAGER" | "ADMIN";
};

export type AuthedRequest = Request & { user?: AuthUser };
