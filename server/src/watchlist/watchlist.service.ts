import { prisma } from "../prisma/client.js";
import { AppError } from "../middleware/errorHandler.js";
import { enrichWithMovieData, enrichSingleMovieData, TmdbMovie } from "../services/tmdb.service.js";

export interface WatchlistWithMovie {
  id: string;
  movieId: number;
  userId: string;
  createdAt: Date;
  movie: TmdbMovie;
}

export async function getWatchlistIds(userId: string): Promise<number[]> {
  const watchlist = await prisma.watchlist.findMany({
    where: { userId },
    select: { movieId: true },
  });
  return watchlist.map((w) => w.movieId);
}

export async function getMyWatchlist(userId: string): Promise<WatchlistWithMovie[]> {
  const watchlist = await prisma.watchlist.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return enrichWithMovieData(watchlist);
}

export async function getUserWatchlist(username: string): Promise<WatchlistWithMovie[]> {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new AppError(404, "User not found");

  const watchlist = await prisma.watchlist.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return enrichWithMovieData(watchlist);
}

export async function addToWatchlist(
  userId: string,
  movieId: number
): Promise<WatchlistWithMovie> {
  if (!movieId || typeof movieId !== "number") {
    throw new AppError(400, "Valid movieId is required");
  }

  const existing = await prisma.watchlist.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (existing) {
    throw new AppError(409, "Movie already in watchlist");
  }

  const entry = await prisma.watchlist.create({
    data: { userId, movieId },
  });

  return enrichSingleMovieData(entry);
}

export async function removeFromWatchlist(
  userId: string,
  movieId: number
): Promise<void> {
  const existing = await prisma.watchlist.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (!existing) {
    throw new AppError(404, "Watchlist entry not found");
  }

  await prisma.watchlist.delete({
    where: { userId_movieId: { userId, movieId } },
  });
}