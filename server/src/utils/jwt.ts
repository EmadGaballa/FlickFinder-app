import jwt from "jsonwebtoken";
import { config } from "./config.js";

export interface JwtPayload {
  userId: string;
  username: string;
}

export function signToken(payload: JwtPayload): string {
  // 7 days in seconds
  const expiresInSeconds = 7 * 24 * 60 * 60;
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: expiresInSeconds,
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
}