import { Request, Response, NextFunction } from "express";
import * as usersService from "./users.service.js";
import { updateProfileSchema, searchUsersSchema } from "../utils/validate.js";

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await usersService.getProfile(req.params.username as string);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = updateProfileSchema.parse(req.body);
    const user = await usersService.updateProfile(req.user!.userId, data);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function searchUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { query } = searchUsersSchema.parse(req.query);
    const users = await usersService.searchUsers(query);
    res.json({ users });
  } catch (err) {
    next(err);
  }
}