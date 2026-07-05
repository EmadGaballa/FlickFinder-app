import { useState, useEffect } from "react";
import { favoritesApi } from "../services/backendApi";
import { useAuth } from "../contexts/AuthContext";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

function Favorites() {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        const data = await favoritesApi.getMyFavorites();
        if (cancelled) return;
        setFavorites(data.favorites);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="favorites-page">
        <div className="favorites-header">
          <h1 className="favorites-title">Favorites</h1>
          <p className="favorites-subtitle">Sign in to save your favorite movies.</p>
        </div>
        <div className="favorites-empty">
          <div className="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2 className="empty-title">Sign in to use Favorites</h2>
          <p className="empty-subtitle">Create an account or sign in to save and organize your favorite movies.</p>
          <a href="/login" className="empty-cta">Sign In</a>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1 className="favorites-title">My Favorites</h1>
        <p className="favorites-subtitle">Your personal collection of beloved films.</p>
      </div>

      <div className="favorites-content">
        {loading ? (
          <div className="search-users-loading">
            <div className="loader-dots"><span /><span /><span /></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="favorites-empty-state">
            <span>❤️</span> No favorites yet. Browse movies and start adding!
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((fav) => (
              <div key={fav.id} className="favorite-item">
                <MovieCard movie={fav.movie} />
                {fav.rating && (
                  <div className="favorite-rating-badge">★ {fav.rating.score.toFixed(1)}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;