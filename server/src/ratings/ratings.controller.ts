import { Request, Response, NextFunction } from "express";
import * as ratingsService from "./ratings.service.js";
import { ratingSchema } from "../utils/validate.js";

export async function upsertRating(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { movieId, score } = ratingSchema.parse(req.body);
    const rating = await ratingsService.upsertRating(req.user!.userId, movieId, score);
    res.status(201).json({ rating });
  } catch (err) {
    next(err);
  }
}

export async function removeRating(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const movieId = parseInt(req.params.movieId as string, 10);
    await ratingsService.removeRating(req.user!.userId, movieId);
    res.json({ message: "Rating removed" });
  } catch (err) {
    next(err);
  }
}

export async function getUserRatings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ratings = await ratingsService.getUserRatings(req.params.username as string);
    res.json({ ratings });
  } catch (err) {
    next(err);
  }
}

export async function getMyRatings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ratings = await ratingsService.getMyRatingsMap(req.user!.userId);
    res.json({ ratings });
  } catch (err) {
    next(err);
  }
}