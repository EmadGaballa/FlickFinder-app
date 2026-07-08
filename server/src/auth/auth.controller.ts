import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../utils/validate.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = registerSchema.parse(req.body);

    const result = await authService.register(data);

    res.cookie(
      "token",
      result.token,
      authService.getCookieOptions()
    );

    res.status(201).json({
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
}


export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = loginSchema.parse(req.body);

    const result = await authService.login(data);

    res.cookie(
      "token",
      result.token,
      authService.getCookieOptions()
    );

    res.json({
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
}


export async function logout(
  _req: Request,
  res: Response
): Promise<void> {

  res.clearCookie(
    "token",
    authService.getClearCookieOptions()
  );

  res.json({
    message: "Logged out successfully",
  });
}


export async function me(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await authService.getMe(
      req.user!.userId
    );

    res.json({
      user,
    });

  } catch (err) {
    next(err);
  }
}


export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {

  try {
    const data = changePasswordSchema.parse(req.body);

    await authService.changePassword(
      req.user!.userId,
      data.currentPassword,
      data.newPassword
    );

    res.json({
      message: "Password changed successfully",
    });

  } catch (err) {
    next(err);
  }
}


export async function getPasswordCooldown(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {

  try {

    const cooldownInfo =
      await authService.getPasswordCooldownInfo(
        req.user!.userId
      );

    res.json(cooldownInfo);

  } catch (err) {
    next(err);
  }
}