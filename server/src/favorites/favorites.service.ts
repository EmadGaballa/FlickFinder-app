import { prisma } from "../prisma/client.js";
import { AppError } from "../middleware/errorHandler.js";
import { enrichWithMovieData, enrichSingleMovieData, TmdbMovie } from "../services/tmdb.service.js";

export interface FavoriteWithMovie {
  id: string;
  movieId: number;
  userId: string;
  createdAt: Date;
  rating: { score: number } | null;
  movie: TmdbMovie;
}

export async function getFavoriteIds(userId: string): Promise<number[]> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { movieId: true },
  });
  return favorites.map((f) => f.movieId);
}

export async function getMyFavorites(userId: string): Promise<FavoriteWithMovie[]> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      rating: { select: { score: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return enrichWithMovieData(favorites);
}

export async function getUserFavorites(username: string): Promise<FavoriteWithMovie[]> {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new AppError(404, "User not found");

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: {
      rating: { select: { score: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return enrichWithMovieData(favorites);
}

export async function addFavorite(
  userId: string,
  movieId: number
): Promise<FavoriteWithMovie> {
  if (!movieId || typeof movieId !== "number") {
    throw new AppError(400, "Valid movieId is required");
  }

  const existing = await prisma.favorite.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (existing) {
    throw new AppError(409, "Movie already in favorites");
  }

  const favorite = await prisma.favorite.create({
    data: { userId, movieId },
    include: { rating: { select: { score: true } } },
  });

  return enrichSingleMovieData(favorite);
}

export async function removeFavorite(
  userId: string,
  movieId: number
): Promise<void> {
  const existing = await prisma.favorite.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (!existing) {
    throw new AppError(404, "Favorite not found");
  }

  // Must delete rating first (FK constraint)
  await prisma.rating.deleteMany({
    where: { userId, movieId },
  });

  await prisma.favorite.delete({
    where: { userId_movieId: { userId, movieId } },
  });
}