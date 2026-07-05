import { prisma } from "../prisma/client.js";
import { AppError } from "../middleware/errorHandler.js";
import { enrichWithMovieData, TmdbMovie } from "../services/tmdb.service.js";

export interface RatingWithMovie {
  id: string;
  movieId: number;
  userId: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  movie: TmdbMovie;
}

export interface RatingMap {
  [movieId: number]: number;
}

export async function upsertRating(
  userId: string,
  movieId: number,
  score: number
): Promise<RatingWithMovie> {
  // Must be in favorites to rate
  const favorite = await prisma.favorite.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (!favorite) {
    throw new AppError(400, "Can only rate movies in your favorites");
  }

  const rating = await prisma.rating.upsert({
    where: { userId_movieId: { userId, movieId } },
    create: { userId, movieId, score },
    update: { score },
  });

  const [enriched] = await enrichWithMovieData([rating]);
  return enriched;
}

export async function removeRating(
  userId: string,
  movieId: number
): Promise<void> {
  await prisma.rating.deleteMany({
    where: { userId, movieId },
  });
}

export async function getUserRatings(username: string): Promise<RatingWithMovie[]> {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new AppError(404, "User not found");

  const ratings = await prisma.rating.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return enrichWithMovieData(ratings);
}

export async function getMyRatingsMap(userId: string): Promise<RatingMap> {
  const ratings = await prisma.rating.findMany({
    where: { userId },
    select: { movieId: true, score: true },
  });

  const map: RatingMap = {};
  ratings.forEach((r) => {
    map[r.movieId] = r.score;
  });

  return map;
}