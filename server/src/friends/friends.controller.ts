import { Request, Response, NextFunction } from "express";
import * as friendsService from "./friends.service.js";

export async function sendRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await friendsService.sendFriendRequest(req.user!.userId, req.params.username as string);
    res.status(result.status || 200).json({ message: result.message });
  } catch (err) {
    next(err);
  }
}

export async function acceptRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await friendsService.acceptFriendRequest(req.user!.userId, req.params.username as string);
    res.json({ message: "Friend request accepted" });
  } catch (err) {
    next(err);
  }
}

export async function rejectRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await friendsService.rejectFriendRequest(req.user!.userId, req.params.username as string);
    res.json({ message: "Friend request rejected" });
  } catch (err) {
    next(err);
  }
}

export async function cancelRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await friendsService.cancelFriendRequest(req.user!.userId, req.params.username as string);
    res.json({ message: "Friend request cancelled" });
  } catch (err) {
    next(err);
  }
}

export async function removeFriend(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await friendsService.removeFriend(req.user!.userId, req.params.username as string);
    res.json({ message: "Friend removed" });
  } catch (err) {
    next(err);
  }
}

export async function getFriends(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const friends = await friendsService.getFriends(req.user!.userId);
    res.json({ friends });
  } catch (err) {
    next(err);
  }
}

export async function getRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const requests = await friendsService.getFriendRequests(req.user!.userId);
    res.json(requests);
  } catch (err) {
    next(err);
  }
}