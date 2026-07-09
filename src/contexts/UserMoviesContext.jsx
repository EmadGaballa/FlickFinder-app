import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import {
  favoritesApi,
  watchlistApi,
  ratingsApi,
} from "../services/backendApi";

const UserMoviesContext = createContext(null);

export function UserMoviesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [watchlistIds, setWatchlistIds] = useState(new Set());
  const [ratings, setRatings] = useState({});
  const [loaded, setLoaded] = useState(false);

  const loadUserMovies = useCallback(async () => {
    try {
      const [favData, watchData, ratingData] = await Promise.all([
        favoritesApi.getMyFavoriteIds(),
        watchlistApi.getMyWatchlistIds(),
        ratingsApi.getMyRatings(),
      ]);

      setFavoriteIds(new Set(favData.ids));
      setWatchlistIds(new Set(watchData.ids));
      setRatings(ratingData.ratings || {});
      setLoaded(true);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const clearUserMovies = () => {
    setFavoriteIds(new Set());
    setWatchlistIds(new Set());
    setRatings({});
    setLoaded(false);
  };

  const addFavorite = async (movieId) => {
    await favoritesApi.addFavorite(movieId);

    setFavoriteIds((prev) => {
      const next = new Set(prev);
      next.add(movieId);
      return next;
    });
  };

  const removeFavorite = async (movieId) => {
    await favoritesApi.removeFavorite(movieId);

    setFavoriteIds((prev) => {
      const next = new Set(prev);
      next.delete(movieId);
      return next;
    });

    setRatings((prev) => {
      const next = { ...prev };
      delete next[movieId];
      return next;
    });
  };

  const addWatchlist = async (movieId) => {
    await watchlistApi.addToWatchlist(movieId);

    setWatchlistIds((prev) => {
      const next = new Set(prev);
      next.add(movieId);
      return next;
    });
  };

  const removeWatchlist = async (movieId) => {
    await watchlistApi.removeFromWatchlist(movieId);

    setWatchlistIds((prev) => {
      const next = new Set(prev);
      next.delete(movieId);
      return next;
    });
  };

  const rateMovie = async (movieId, score) => {
    await ratingsApi.rateMovie(movieId, score);

    setRatings((prev) => ({
      ...prev,
      [movieId]: score,
    }));
  };

  const removeRating = async (movieId) => {
    await ratingsApi.removeRating(movieId);

    setRatings((prev) => {
      const next = { ...prev };
      delete next[movieId];
      return next;
    });
  };

  return (
    <UserMoviesContext.Provider
      value={{
        favoriteIds,
        watchlistIds,
        ratings,
        loaded,

        loadUserMovies,
        clearUserMovies,

        addFavorite,
        removeFavorite,

        addWatchlist,
        removeWatchlist,

        rateMovie,
        removeRating,
      }}
    >
      {children}
    </UserMoviesContext.Provider>
  );
}

export function useUserMovies() {
  return useContext(UserMoviesContext);
}