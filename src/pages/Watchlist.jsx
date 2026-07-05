import { useState, useEffect } from "react";
import { watchlistApi } from "../services/backendApi";
import { useAuth } from "../contexts/AuthContext";
import MovieCard from "../components/MovieCard";
import "../css/Watchlist.css";

function Watchlist() {
  const { isAuthenticated } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        const data = await watchlistApi.getMyWatchlist();
        if (cancelled) return;
        setWatchlist(data.watchlist);
      } catch (err) {
        console.error("Failed to load watchlist:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="watchlist-page">
        <div className="watchlist-header">
          <h1 className="watchlist-title">Watchlist</h1>
          <p className="watchlist-subtitle">Sign in to manage your watchlist.</p>
        </div>
        <div className="watchlist-empty">
          <div className="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h2 className="empty-title">Sign in to use Watchlist</h2>
          <p className="empty-subtitle">Create an account or sign in to save movies for later.</p>
          <a href="/login" className="empty-cta">Sign In</a>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <h1 className="watchlist-title">Watchlist</h1>
        <p className="watchlist-subtitle">Movies you want to watch.</p>
      </div>

      <div className="watchlist-content">
        {loading ? (
          <div className="search-users-loading">
            <div className="loader-dots"><span /><span /><span /></div>
          </div>
        ) : watchlist.length === 0 ? (
          <div className="watchlist-empty">
            <span>📑</span> Your watchlist is empty. Browse movies and add some!
          </div>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map((item) => (
              <div key={item.id} className="watchlist-item">
                <MovieCard movie={item.movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;