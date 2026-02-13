import type { Request } from "express";

export type AuthUser = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export type AuthedRequest = Request & { user?: AuthUser };
