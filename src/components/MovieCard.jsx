import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../css/MovieCard.css";
import { useUserMovies } from "../contexts/UserMoviesContext";

const TMDB_IMG = "https://image.tmdb.org/t/p/";

function MovieCard({ movie }) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    favoriteIds,
    watchlistIds,
    ratings,
    addFavorite,
    removeFavorite,
    addWatchlist,
    removeWatchlist,
  } = useUserMovies();

  const isFav = favoriteIds.has(movie.id);
  const isWatchlist = watchlistIds.has(movie.id);
  const userRating = ratings[movie.id];

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) return;

    setLoading(true);

    try {
      if (isFav) {
        await removeFavorite(movie.id);
      } else {
        await addFavorite(movie.id);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) return;

    setLoading(true);

    try {
      if (isWatchlist) {
        await removeWatchlist(movie.id);
      } else {
        await addWatchlist(movie.id);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `${TMDB_IMG}w500${movie.poster_path}`
    : null;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown";

  const ratingColor =
    movie.vote_average >= 8
      ? "#ffd166"
      : movie.vote_average >= 6.5
        ? "#f4a261"
        : "#e76f51";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-link">
      <div className="movie-card">
        <div className="movie-poster">
          {posterUrl ? (
            <img src={posterUrl} alt={movie.title} loading="lazy" />
          ) : (
            <div className="movie-poster-fallback">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M7 2v20M17 2v20M2 12h20" />
              </svg>
              <span>No Poster</span>
            </div>
          )}

          <div className="movie-gradient" />

          {rating && (
            <div className="movie-rating" style={{ color: ratingColor }}>
              ⭐ {rating}
            </div>
          )}

          {userRating && (
            <div className="movie-user-rating">★ {userRating.toFixed(1)}</div>
          )}

          <div className="movie-actions">
            <button
              className={`action-btn ${isFav ? "action-btn--active" : ""}`}
              onClick={handleFavorite}
              disabled={loading}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              {isFav ? "❤️" : "🤍"}
            </button>
            <button
              className={`action-btn ${isWatchlist ? "action-btn--active" : ""}`}
              onClick={handleWatchlist}
              disabled={loading}
              title={isWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              {isWatchlist ? "🔖" : "🍿"}
            </button>
          </div>

          <div className="movie-overlay">
            <div className="movie-overlay-content">
              <h3 className="overlay-title">{movie.title}</h3>
              <div className="overlay-meta">
                <span>{year}</span>
                {rating && (
                  <span style={{ color: ratingColor }}>⭐ {rating}</span>
                )}
              </div>
              <p className="movie-overview">
                {movie.overview
                  ? movie.overview.slice(0, 140) +
                    (movie.overview.length > 140 ? "..." : "")
                  : "No cinematic description available."}
              </p>
              <div className="overlay-actions">
                <span className="watch-now">▶ Explore Movie</span>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span className="movie-year">📅 {year}</span>
            {isFav && <span className="movie-badge movie-badge--fav">❤️</span>}
            {isWatchlist && (
              <span className="movie-badge movie-badge--watch">🔖</span>
            )}
            {userRating && (
              <span className="movie-badge movie-badge--rated">
                ★ {userRating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
