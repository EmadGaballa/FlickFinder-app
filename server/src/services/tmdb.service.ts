const TMDB_BASE = "https://api.themoviedb.org/3";

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string | null;
  genres: { id: number; name: string }[];
  release_date: string | null;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  status: string;
  homepage: string | null;
  production_companies: { id: number; name: string; logo_path: string | null }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
}

interface TmdbMovieMinimal {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string | null;
  genre_ids: number[];
  release_date: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
}

const getAuthHeader = (): Record<string, string> => {
  const readToken = process.env.TMDB_READ_TOKEN;
  const apiKey = process.env.TMDB_API_KEY;
  if (readToken) {
    return { Authorization: `Bearer ${readToken}` };
  }
  if (apiKey) {
    return {};
  }
  return {};
};

const getApiKeyParam = (): string => {
  const apiKey = process.env.TMDB_API_KEY;
  if (apiKey && !process.env.TMDB_READ_TOKEN) {
    return `?api_key=${apiKey}`;
  }
  return "";
};

async function tmdbFetch<T>(path: string): Promise<T> {
  const headers = getAuthHeader();
  const suffix = getApiKeyParam();
  const url = `${TMDB_BASE}${path}${suffix}`;
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch full movie details from TMDB.
 */
export async function getMovieDetails(movieId: number): Promise<TmdbMovie> {
  return tmdbFetch<TmdbMovie>(`/movie/${movieId}?language=en-US`);
}

/**
 * Fetch multiple movie details in parallel.
 */
export async function getMoviesDetails(movieIds: number[]): Promise<TmdbMovie[]> {
  if (movieIds.length === 0) return [];
  const uniqueIds = [...new Set(movieIds)];
  const movies = await Promise.all(
    uniqueIds.map((id) => getMovieDetails(id).catch(() => null))
  );
  return movies.filter((m): m is TmdbMovie => m !== null);
}

/**
 * Enrich an array of items that have movieId with full TMDB movie data.
 * Returns items with a `movie` property containing the full TMDB object.
 */
export async function enrichWithMovieData<T extends { movieId: number }>(
  items: T[]
): Promise<(T & { movie: TmdbMovie })[]> {
  if (items.length === 0) return [];
  const movieIds = items.map((item) => item.movieId);
  const movies = await getMoviesDetails(movieIds);
  const movieMap = new Map<number, TmdbMovie>();
  movies.forEach((movie) => movieMap.set(movie.id, movie));

  return items.map((item) => {
    const movie = movieMap.get(item.movieId);
    if (!movie) {
      // Fallback: return a minimal movie object with the ID
      return {
        ...item,
        movie: {
          id: item.movieId,
          title: `Movie #${item.movieId}`,
          poster_path: null,
          backdrop_path: null,
          overview: null,
          genres: [],
          release_date: null,
          runtime: null,
          vote_average: 0,
          vote_count: 0,
          popularity: 0,
          original_language: "en",
          tagline: null,
          budget: 0,
          revenue: 0,
          status: "Unknown",
          homepage: null,
          production_companies: [],
          spoken_languages: [],
        },
      };
    }
    return { ...item, movie };
  });
}

/**
 * Fetch a single movie and return it alongside the original item.
 */
export async function enrichSingleMovieData<T extends { movieId: number }>(
  item: T
): Promise<T & { movie: TmdbMovie }> {
  const [enriched] = await enrichWithMovieData([item]);
  return enriched;
}

export type { TmdbMovie, TmdbMovieMinimal };