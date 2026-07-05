import { prisma } from "../prisma/client.js";
import { AppError } from "../middleware/errorHandler.js";
import { config } from "../utils/config.js";
import { getMoviesDetails } from "../services/tmdb.service.js";
import { extractHeroPalette, type HeroPalette } from "../services/colorPalette.service.js";

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  createdAt: Date;
  stats: {
    totalFavorites: number;
    totalWatchlist: number;
    totalRatings: number;
    totalFriends: number;
    averageRating: number | null;
    highestRatedMovieId: number | null;
    highestRatedScore: number | null;
    recentFavoriteMovieId: number | null;
  };
  bannerMovie?: {
    id: number;
    title: string;
    backdrop_path: string | null;
    vote_average: number;
    genres: { id: number; name: string }[];
    palette: HeroPalette | null;
  };
}

export interface UserPublic {
  id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  createdAt: Date;
  _count: {
    favorites: number;
    friendships: number;
  };
}

export async function getProfile(username: string): Promise<UserProfile> {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatar: true,
      createdAt: true,
      _count: {
        select: {
          favorites: true,
          watchlists: true,
          ratings: true,
          friendships: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const ratings = await prisma.rating.findMany({
    where: { userId: user.id },
    select: { score: true, movieId: true },
    orderBy: { createdAt: "desc" },
  });

  const avgRating =
    ratings.length > 0
      ? ratings.reduce((sum: number, r: { score: number }) => sum + r.score, 0) / ratings.length
      : null;

  const highestRated = ratings.length > 0
    ? ratings.reduce((best: { score: number; movieId: number }, r: { score: number; movieId: number }) =>
        r.score > best.score ? r : best
      )
    : null;

  const recentFav = await prisma.favorite.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: { movieId: true },
  });

  // Select banner movie from highest rated movies
  let bannerMovie: UserProfile["bannerMovie"] = undefined;
  if (ratings.length > 0) {
    const maxScore = Math.max(...ratings.map((r) => r.score));
    const topRatedIds = ratings
      .filter((r) => r.score === maxScore)
      .map((r) => r.movieId)
      .slice(0, 20); // safety cap so a user with many tied top ratings doesn't trigger too many TMDB calls

    const movies = await getMoviesDetails(topRatedIds);
    const sorted = movies
      .filter((m) => m.backdrop_path)
      .sort((a, b) => b.vote_average - a.vote_average);

    if (sorted.length > 0) {
      const selected = sorted[0];
      const backdropUrl = `https://image.tmdb.org/t/p/w1280${selected.backdrop_path}`;
      const palette = await extractHeroPalette(backdropUrl);

      bannerMovie = {
        id: selected.id,
        title: selected.title,
        backdrop_path: selected.backdrop_path,
        vote_average: selected.vote_average,
        genres: selected.genres,
        palette,
      };
    }
  }

  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    avatar: user.avatar,
    createdAt: user.createdAt,
    stats: {
      totalFavorites: user._count.favorites,
      totalWatchlist: user._count.watchlists,
      totalRatings: user._count.ratings,
      totalFriends: user._count.friendships,
      averageRating: avgRating ? Math.round(avgRating * 10) / 10 : null,
      highestRatedMovieId: highestRated?.movieId ?? null,
      highestRatedScore: highestRated?.score ?? null,
      recentFavoriteMovieId: recentFav?.movieId ?? null,
    },
    bannerMovie,
  };
}

export async function updateProfile(
  userId: string,
  data: { displayName?: string; avatar?: string }
): Promise<{
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string | null;
  createdAt: Date;
  displayNameUpdatedAt: Date | null;
}> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, "User not found");

  const updateData: Record<string, unknown> = {};

  if (data.displayName !== undefined) {
    if (user.displayNameUpdatedAt) {
      const daysSinceUpdate =
        (Date.now() - user.displayNameUpdatedAt.getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysSinceUpdate < config.displayNameCooldownDays) {
        const daysLeft = Math.ceil(config.displayNameCooldownDays - daysSinceUpdate);
        throw new AppError(429, `Display name can be changed again in ${daysLeft} day(s)`);
      }
    }
    updateData.displayName = data.displayName;
    updateData.displayNameUpdatedAt = new Date();
  }

  if (data.avatar !== undefined) {
    updateData.avatar = data.avatar;
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      username: true,
      displayName: true,
      email: true,
      avatar: true,
      createdAt: true,
      displayNameUpdatedAt: true,
    },
  });

  return updated;
}

export async function searchUsers(query: string): Promise<UserPublic[]> {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: "insensitive" } },
        { displayName: { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatar: true,
      createdAt: true,
      _count: { select: { favorites: true, friendships: true } },
    },
    take: 20,
  });

  return users;
}