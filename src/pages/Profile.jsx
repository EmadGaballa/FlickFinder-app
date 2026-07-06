import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  usersApi,
  favoritesApi,
  watchlistApi,
  ratingsApi,
  friendsApi,
} from "../services/backendApi";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../components/Avatar";
import MovieCard from "../components/MovieCard";
import "../css/Profile.css";

function Profile() {
  const { username } = useParams();
  const { user: currentUser, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("favorites");
  const [isFriend, setIsFriend] = useState(false);
  const [friendLoading, setFriendLoading] = useState(false);
  const [ratingsSort, setRatingsSort] = useState("highest");
  const [bannerMovie, setBannerMovie] = useState(null);

  const heroScrollLayerRef = useRef(null);

  const isOwnProfile = currentUser && currentUser.username === username;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [profileRes, favRes, watchRes, ratingRes] = await Promise.all([
          usersApi.getProfile(username),
          favoritesApi.getUserFavorites(username),
          watchlistApi.getUserWatchlist(username),
          ratingsApi.getUserRatings(username),
        ]);
        if (cancelled) return;
        setProfile(profileRes.user);
        setBannerMovie(profileRes.user.bannerMovie || null);
        setFavorites(favRes.favorites);
        setWatchlist(watchRes.watchlist);
        setRatings(ratingRes.ratings);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  useEffect(() => {
    if (!isAuthenticated || !currentUser || isOwnProfile) {
      setIsFriend(false);
      return;
    }
    let cancelled = false;
    async function checkFriend() {
      try {
        const data = await friendsApi.getFriends();
        if (cancelled) return;
        setIsFriend(data.friends.some((f) => f.username === username));
      } catch {
        // ignore
      }
    }
    checkFriend();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, currentUser, username, isOwnProfile]);

  // Makes the backdrop scroll slightly slower than the rest of the page.
  // Updates a ref directly (no setState) so scrolling never re-renders React.
  useEffect(() => {
    if (!bannerMovie?.backdrop_path) return;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = window.scrollY * 0.3;
        if (heroScrollLayerRef.current) {
          heroScrollLayerRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [bannerMovie]);

  const handleFriendRequest = async () => {
    setFriendLoading(true);
    try {
      await friendsApi.sendRequest(username);
      setIsFriend(true);
    } catch (err) {
      console.error("Friend request failed:", err);
    } finally {
      setFriendLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-skeleton">
          <div className="skeleton-avatar" />
          <div className="skeleton-line wide" />
          <div className="skeleton-line medium" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          <div>
            <h2>User Not Found</h2>
            <p>The user @{username} does not exist.</p>
            <Link to="/" className="empty-cta">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stats = profile.stats;
  const avgRating = stats.averageRating ? stats.averageRating.toFixed(1) : "—";

  const heroBackdrop = bannerMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`
    : null;

  const palette = bannerMovie?.palette || null;
  const heroStyle = palette
    ? {
        "--hero-primary": palette.primary,
        "--hero-secondary": palette.secondary,
        "--hero-glow": palette.glow,
      }
    : undefined;

  return (
    <div className="profile-page" style={heroStyle}>
      {/* Cinematic Hero */}
      {heroBackdrop && (
        <div className="profile-hero">
          <div className="profile-hero-scroll-layer" ref={heroScrollLayerRef}>
            <div
              className="profile-hero-backdrop"
              style={{ backgroundImage: `url(${heroBackdrop})` }}
            />
          </div>
          <div className="profile-hero-overlay" />
          <div className="profile-hero-ambient" />
          <div className="profile-hero-vignette" />
          <div className="profile-hero-gradient" />
          <div className="profile-hero-grain" />
          <div className="profile-hero-particles" />
          <div className="profile-hero-glass" />
        </div>
      )}

      {/* Header — content sits directly over the hero's darkened base */}
      <div
        className={`profile-header${heroBackdrop ? " profile-header--with-hero" : ""}`}
      >
        <div className="profile-header-inner">
          <div className="profile-header-main">
            <div className="profile-avatar-wrap">
              <Avatar id={profile.avatar} size={150} className="profile-avatar" />
            </div>
            <div className="profile-info">
              <h1 className="profile-display-name">{profile.displayName}</h1>
              <p className="profile-username">@{profile.username}</p>
              <p className="profile-joined">
                Joined {new Date(profile.createdAt).toLocaleDateString()}
              </p>
              <div className="profile-stats">
                <div className="profile-stat">
                  <div className="profile-stat-value">{stats.totalFavorites}</div>
                  <div className="profile-stat-label">Favorites</div>
                </div>
                <div className="profile-stat">
                  <div className="profile-stat-value">{stats.totalWatchlist}</div>
                  <div className="profile-stat-label">Watchlist</div>
                </div>
                <div className="profile-stat">
                  <div className="profile-stat-value">{stats.totalRatings}</div>
                  <div className="profile-stat-label">Ratings</div>
                </div>
                <div className="profile-stat">
                  <div className="profile-stat-value">{avgRating}</div>
                  <div className="profile-stat-label">Avg Rating</div>
                </div>
                <div className="profile-stat">
                  <div className="profile-stat-value">{stats.totalFriends}</div>
                  <div className="profile-stat-label">Friends</div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-header-aside">
            {isAuthenticated && !isOwnProfile && (
              <div className="profile-friend-action">
                {isFriend ? (
                  <span className="profile-friend-badge">✓ Friends</span>
                ) : (
                  <button
                    className="profile-friend-btn"
                    onClick={handleFriendRequest}
                    disabled={friendLoading}
                  >
                    {friendLoading ? "Sending..." : "Add Friend"}
                  </button>
                )}
              </div>
            )}

            {isOwnProfile && bannerMovie && (
              <div className="profile-top-pick">
                <span className="profile-top-pick-label">Top Pick</span>
                <Link
                  to={`/movie/${bannerMovie.id}`}
                  className="profile-top-pick-title"
                >
                  {bannerMovie.title}
                </Link>
                {bannerMovie.genres?.length > 0 && (
                  <div className="profile-top-pick-genres">
                    {bannerMovie.genres.slice(0, 3).map((g) => (
                      <span key={g.id} className="profile-top-pick-genre">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`profile-tab${activeTab === "favorites" ? " profile-tab--active" : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites ({favorites.length})
        </button>
        <button
          className={`profile-tab${activeTab === "watchlist" ? " profile-tab--active" : ""}`}
          onClick={() => setActiveTab("watchlist")}
        >
          Watchlist ({watchlist.length})
        </button>
        <button
          className={`profile-tab${activeTab === "ratings" ? " profile-tab--active" : ""}`}
          onClick={() => setActiveTab("ratings")}
        >
          Ratings ({ratings.length})
        </button>
      </div>

      {/* Content */}
      <div className="profile-content">
        {activeTab === "favorites" &&
          (favorites.length === 0 ? (
            <div className="profile-empty">No favorites yet</div>
          ) : (
            <div className="profile-movie-grid">
              {favorites.map((fav) => (
                <div key={fav.id} className="profile-movie-card">
                  <MovieCard movie={fav.movie} />
                  {fav.rating && (
                    <div className="profile-movie-rating">
                      ★ {fav.rating.score.toFixed(1)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

        {activeTab === "watchlist" &&
          (watchlist.length === 0 ? (
            <div className="profile-empty">No watchlist items yet</div>
          ) : (
            <div className="profile-movie-grid">
              {watchlist.map((item) => (
                <div key={item.id} className="profile-movie-card">
                  <MovieCard movie={item.movie} />
                </div>
              ))}
            </div>
          ))}

        {activeTab === "ratings" &&
          (ratings.length === 0 ? (
            <div className="profile-empty">No ratings yet</div>
          ) : (
            <RatingsTab
              ratings={ratings}
              sort={ratingsSort}
              onSortChange={setRatingsSort}
            />
          ))}
      </div>
    </div>
  );
}

function RatingsTab({ ratings, sort, onSortChange }) {
  const sorted = [...ratings].sort((a, b) => {
    switch (sort) {
      case "highest":
        return b.score - a.score;
      case "lowest":
        return a.score - b.score;
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "title":
        return a.movie.title.localeCompare(b.movie.title);
      default:
        return 0;
    }
  });

  return (
    <div className="ratings-tab">
      <div className="ratings-sort">
        <label htmlFor="ratings-sort">Sort by</label>
        <select
          id="ratings-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
          <option value="newest">Newest Rated</option>
          <option value="oldest">Oldest Rated</option>
          <option value="title">Movie Title (A-Z)</option>
        </select>
      </div>

      <div className="ratings-list">
        {sorted.map((r) => (
          <div key={r.id} className="rating-row">
            <Link to={`/movie/${r.movie.id}`} className="rating-poster-link">
              <img
                className="rating-poster"
                src={
                  r.movie.poster_path
                    ? `https://image.tmdb.org/t/p/w185${r.movie.poster_path}`
                    : undefined
                }
                alt={r.movie.title}
              />
            </Link>

            <div className="rating-info">
              <Link to={`/movie/${r.movie.id}`} className="rating-title">
                {r.movie.title}
              </Link>

              {r.movie.tagline && (
                <div className="rating-tagline">{r.movie.tagline}</div>
              )}

              <div className="rating-meta">
                <span className="rating-year">
                  {r.movie.release_date?.split("-")[0] || "Unknown Year"}
                </span>
                {r.movie.genres?.length > 0 && (
                  <>
                    <span className="rating-meta-sep">•</span>
                    <span className="rating-genres">
                      {r.movie.genres.map((g) => g.name).join(" • ")}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="rating-score">★ {r.score.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;