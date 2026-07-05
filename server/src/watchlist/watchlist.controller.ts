import { Request, Response, NextFunction } from "express";
import * as watchlistService from "./watchlist.service.js";

export async function getIds(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ids = await watchlistService.getWatchlistIds(req.user!.userId);
    res.json({ ids });
  } catch (err) {
    next(err);
  }
}

export async function getMyWatchlist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const watchlist = await watchlistService.getMyWatchlist(req.user!.userId);
    res.json({ watchlist });
  } catch (err) {
    next(err);
  }
}

export async function getUserWatchlist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const watchlist = await watchlistService.getUserWatchlist(req.params.username as string);
    res.json({ watchlist });
  } catch (err) {
    next(err);
  }
}

export async function addToWatchlist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { movieId } = req.body;
    const entry = await watchlistService.addToWatchlist(req.user!.userId, movieId);
    res.status(201).json({ watchlist: entry });
  } catch (err) {
    next(err);
  }
}

export async function removeFromWatchlist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const movieId = parseInt(req.params.movieId as string, 10);
    await watchlistService.removeFromWatchlist(req.user!.userId, movieId);
    res.json({ message: "Removed from watchlist" });
  } catch (err) {
    next(err);
  }
}