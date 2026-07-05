import { Request, Response, NextFunction } from "express";
import * as favoritesService from "./favorites.service.js";

export async function getIds(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ids = await favoritesService.getFavoriteIds(req.user!.userId);
    res.json({ ids });
  } catch (err) {
    next(err);
  }
}

export async function getMyFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const favorites = await favoritesService.getMyFavorites(req.user!.userId);
    res.json({ favorites });
  } catch (err) {
    next(err);
  }
}

export async function getUserFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const favorites = await favoritesService.getUserFavorites(req.params.username as string);
    res.json({ favorites });
  } catch (err) {
    next(err);
  }
}

export async function addFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { movieId } = req.body;
    const favorite = await favoritesService.addFavorite(req.user!.userId, movieId);
    res.status(201).json({ favorite });
  } catch (err) {
    next(err);
  }
}

export async function removeFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const movieId = parseInt(req.params.movieId as string, 10);
    await favoritesService.removeFavorite(req.user!.userId, movieId);
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    next(err);
  }
}