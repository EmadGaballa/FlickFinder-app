const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

// Use read token if available, otherwise fall back to API key
const getAuthHeader = () => {
    if (READ_TOKEN) {
        return { Authorization: `Bearer ${READ_TOKEN}` };
    }
    return {};
};

const tmdbFetch = async (url) => {
    const headers = getAuthHeader();
    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};

export const getPopularMovies = async (page = 1) => {
    const data = await tmdbFetch(
        `${BASE_URL}/movie/popular?page=${page}`
    );
    return data.results;
};

export const searchMovies = async (query) => {
    const data = await tmdbFetch(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    );
    return data.results;
};

export const getMovieDetails = async (id) => {
    const [details, credits, videos, recommendations, similar] = await Promise.all([
        tmdbFetch(`${BASE_URL}/movie/${id}?language=en-US`),
        tmdbFetch(`${BASE_URL}/movie/${id}/credits`),
        tmdbFetch(`${BASE_URL}/movie/${id}/videos`),
        tmdbFetch(`${BASE_URL}/movie/${id}/recommendations`),
        tmdbFetch(`${BASE_URL}/movie/${id}/similar`),
    ]);

    return {
        ...details,
        cast: credits.cast?.slice(0, 12) ?? [],
        crew: credits.crew ?? [],
        trailer: videos.results?.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
        ) ?? null,
        videos: videos.results ?? [],
        recommendations: recommendations.results ?? [],
        similar: similar.results ?? [],
    };
};

export const getGenres = async () => {
    const data = await tmdbFetch(`${BASE_URL}/genre/movie/list`);
    return data.genres; // [{ id, name }, ...]
};

// Main discover function — used for filtered + infinite scroll browsing
// filters: { genreId, sortBy, minRating, yearFrom, yearTo }
export const discoverMovies = async (page = 1, filters = {}) => {
    const params = new URLSearchParams({
        page,
        sort_by: filters.sortBy || "popularity.desc",
        include_adult: false,
        include_video: false,
    });

    if (filters.genreId)   params.set("with_genres",           filters.genreId);
    if (filters.minRating) params.set("vote_average.gte",      filters.minRating);
    if (filters.yearFrom)  params.set("primary_release_date.gte", `${filters.yearFrom}-01-01`);
    if (filters.yearTo)    params.set("primary_release_date.lte", `${filters.yearTo}-12-31`);

    const data = await tmdbFetch(`${BASE_URL}/discover/movie?${params}`);
    return {
        results: data.results ?? [],
        totalPages: data.total_pages ?? 1,
    };
};
