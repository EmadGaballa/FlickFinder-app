import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { favoritesApi, watchlistApi, ratingsApi } from "../services/backendApi";
import { useAuth } from "../contexts/AuthContext";
import { getMovieDetails } from "../services/api";
import RatingModal from "../components/RatingModal";
import Avatar from "../components/Avatar";
import "../css/MovieDetail.css";

const TMDB_IMG = "https://image.tmdb.org/t/p/";
const EASE = [0.16, 1, 0.3, 1];

/* ── Icons ─────────────────────────────────────────── */
function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s-7.5-4.6-10-9.3C0.3 8 2 4.5 5.6 4c2-.3 3.7.6 4.9 2.2C11.7 4.6 13.4 3.7 15.4 4c3.6.5 5.3 4 3.6 7.7C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}
function BookmarkIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
      <path d="M6 3h12v18l-6-4.2L6 21V3z" />
    </svg>
  );
}
function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.7 5.9 21l1.5-6.8-5.2-4.7 6.9-.7L12 2.5z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a13 13 0 0 1 0 18a13 13 0 0 1 0-18z" />
    </svg>
  );
}
function FilmIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 2v20M17 2v20M2 12h20" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function DollarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2v20M17 6.5c0-1.9-2.2-3.5-5-3.5s-5 1.5-5 3.5 2.2 3 5 3.5c2.8.5 5 1.6 5 3.5s-2.2 3.5-5 3.5-5-1.6-5-3.5" />
    </svg>
  );
}
function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z" />
      <path d="M10 6v12" strokeDasharray="2 3" />
    </svg>
  );
}

/* ── Score Ring ────────────────────────────────────── */
function ScoreRing({ score, color, size = 68, stroke = 3 }) {
  const pct = Math.max(0, Math.min(100, Math.round((score || 0) * 10)));
  const r = (size - stroke * 2) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="md-score-ring">
      <defs>
        <filter id="md-ring-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={size * 0.045} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="rgba(8,8,11,0.92)" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        filter="url(#md-ring-glow)"
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" className="md-score-text" style={{ fontSize: size * 0.24 }}>
        {score ? score.toFixed(1) : "–"}
      </text>
    </svg>
  );
}

/* ── Glow toggle button (the "lightbulb" action) ──── */
function GlowButton({ active, onClick, disabled, icon, label, tone = "gold", size = "md" }) {
  return (
    <div className={`gb-wrap gb-wrap--${size}`}>
      <motion.button
        type="button"
        className={`gb gb--${tone} ${active ? "gb--active" : ""}`}
        onClick={onClick}
        disabled={disabled}
        aria-pressed={active}
        aria-label={label}
        whileHover={disabled ? {} : { y: -3 }}
        whileTap={disabled ? {} : { scale: 0.92 }}
      >
        <motion.span
          className="gb-halo"
          animate={{
            opacity: active ? [0, 1, 0.55, 1] : [1, 0.12, 0.5, 0],
            scale: active ? [0.6, 1.25, 0.95, 1] : [1, 1.12, 0.9, 0.75],
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <span className="gb-icon">{icon}</span>
      </motion.button>
      {label && <span className="gb-label">{label}</span>}
    </div>
  );
}

/* ── Section heading ───────────────────────────────── */
function SectionHeading({ eyebrow, title }) {
  return (
    <div className="sec-head">
      {eyebrow && <span className="sec-eyebrow">{eyebrow}</span>}
      <h3 className="sec-title">{title}</h3>
      <span className="sec-rule" />
    </div>
  );
}

/* ── Horizontal rail with peek arrows ─────────────── */
function Rail({ children }) {
  const trackRef = useRef(null);
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: "smooth" });
  };
  return (
    <div className="md-rail-wrap">
      <button className="md-rail-arrow md-rail-arrow--left" onClick={() => scrollBy(-1)} aria-label="Scroll left" type="button">
        <ChevronLeftIcon />
      </button>
      <div className="md-rail-track" ref={trackRef}>
        {children}
      </div>
      <button className="md-rail-arrow md-rail-arrow--right" onClick={() => scrollBy(1)} aria-label="Scroll right" type="button">
        <ChevronRightIcon />
      </button>
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function Section({ children, className = "" }) {
  return (
    <motion.section
      className={`md-section ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.section>
  );
}

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const reducedMotion = useReducedMotion();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showCondensed, setShowCondensed] = useState(false);
  const [trailerPlaying, setTrailerPlaying] = useState(false);

  const sentinelRef = useRef(null);
  const posterRef = useRef(null);

  /* Poster tilt that follows the cursor */
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);
  const rXs = useSpring(rX, { stiffness: 150, damping: 18 });
  const rYs = useSpring(rY, { stiffness: 150, damping: 18 });

  const handlePosterMove = (e) => {
    if (reducedMotion) return;
    const el = posterRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rY.set(px * 16);
    rX.set(py * -16);
  };
  const handlePosterLeave = () => {
    rX.set(0);
    rY.set(0);
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(id);
        if (!cancelled) setMovie(data);
      } catch (err) {
        console.error("Failed to load movie:", err);
        if (!cancelled) setError("Failed to load movie details. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    window.scrollTo(0, 0);
    setTrailerPlaying(false);
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated || !movie?.id) return;
    let cancelled = false;
    async function load() {
      try {
        const [favData, watchData, ratingData] = await Promise.all([
          favoritesApi.getMyFavoriteIds(),
          watchlistApi.getMyWatchlistIds(),
          ratingsApi.getMyRatings(),
        ]);
        if (cancelled) return;
        setIsFav(favData.ids.includes(movie.id));
        setIsWatchlist(watchData.ids.includes(movie.id));
        setUserRating(ratingData.ratings[movie.id] || null);
      } catch {
        // ignore
      }
    }
    load();
    return () => { cancelled = true; };
  }, [isAuthenticated, movie?.id]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setShowCondensed(!entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [movie]);

  const handleFavorite = async () => {
    if (!isAuthenticated || !movie) return;
    setActionLoading(true);
    try {
      if (isFav) {
        await favoritesApi.removeFavorite(movie.id);
        setIsFav(false);
        setUserRating(null);
      } else {
        await favoritesApi.addFavorite(movie.id);
        setIsFav(true);
        setShowRatingModal(true);
      }
    } catch (err) {
      console.error("Favorite action failed:", err);
    }
    setActionLoading(false);
  };

  const handleWatchlist = async () => {
    if (!isAuthenticated || !movie) return;
    setActionLoading(true);
    try {
      if (isWatchlist) {
        await watchlistApi.removeFromWatchlist(movie.id);
        setIsWatchlist(false);
      } else {
        await watchlistApi.addToWatchlist(movie.id);
        setIsWatchlist(true);
      }
    } catch (err) {
      console.error("Watchlist action failed:", err);
    }
    setActionLoading(false);
  };

  const handleRated = (score) => {
    setUserRating(score);
    setIsFav(true);
  };

  const handleRatingRemoved = () => {
    setUserRating(null);
  };

  const handleRemoveRatingDirect = async () => {
    if (!isAuthenticated || !movie) return;
    setActionLoading(true);
    try {
      await ratingsApi.removeRating(movie.id);
      setUserRating(null);
    } catch (err) {
      console.error("Failed to remove rating:", err);
    }
    setActionLoading(false);
  };

  if (loading) {
    return (
      <div className="movie-detail-page">
        <div className="md-grain" aria-hidden="true" />
        <div className="movie-detail-skeleton">
          <div className="skeleton-poster" />
          <div className="skeleton-info">
            <div className="skeleton-line wide" />
            <div className="skeleton-line" />
            <div className="skeleton-line medium" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-detail-page">
        <div className="movie-detail-error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <Link to="/" className="empty-cta">Go Home</Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail-page">
        <div className="movie-detail-error">
          <h2>Movie not found</h2>
          <Link to="/" className="empty-cta">Go Home</Link>
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path ? `${TMDB_IMG}w500${movie.poster_path}` : null;
  const backdropUrl = movie.backdrop_path ? `${TMDB_IMG}original${movie.backdrop_path}` : null;
  const year = movie.release_date ? movie.release_date.split("-")[0] : "Unknown";
  const ratingColor =
    movie.vote_average >= 8 ? "#f0b429" : movie.vote_average >= 6.5 ? "#ef8354" : "#ff5d5d";
  const director = movie.crew?.find((person) => person.job === "Director");

  const formatCurrency = (amount) => {
    if (!amount) return null;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const budget = movie.budget || 0;
  const revenue = movie.revenue || 0;
  const profit = revenue && budget ? revenue - budget : null;
  const multiplier = revenue && budget ? revenue / budget : null;

  const trailerThumb = movie.trailer
    ? `https://img.youtube.com/vi/${movie.trailer.key}/maxresdefault.jpg`
    : null;

  return (
    <div className="movie-detail-page" style={{ "--accent-dynamic": ratingColor }}>
      <div className="md-grain" aria-hidden="true" />
      <div className={`md-aurora ${reducedMotion ? "md-aurora--static" : ""}`} aria-hidden="true">
        <span className="md-aurora-blob md-aurora-blob--gold" />
        <span className="md-aurora-blob md-aurora-blob--teal" />
        <span className="md-aurora-blob md-aurora-blob--ember" />
      </div>

      {/* Condensed sticky bar, shown once the hero scrolls out of view */}
      <AnimatePresence>
        {showCondensed && (
          <motion.div
            className="md-condensed"
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: EASE }}
          >
            <button className="md-condensed-back" onClick={() => navigate(-1)} aria-label="Go back" type="button">
              <ChevronLeftIcon />
            </button>
            <span className="md-condensed-title">{movie.title}</span>
            <div className="md-condensed-actions">
              <GlowButton active={isFav} onClick={handleFavorite} disabled={actionLoading} icon={<HeartIcon filled={isFav} />} tone="ember" size="sm" />
              <GlowButton active={isWatchlist} onClick={handleWatchlist} disabled={actionLoading} icon={<BookmarkIcon filled={isWatchlist} />} tone="teal" size="sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ──────────────────────────────────── */}
      <section className="md-hero">
        {backdropUrl && (
          <div
            className={`md-hero-backdrop ${reducedMotion ? "" : "md-hero-backdrop--kenburns"}`}
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}
        {!reducedMotion && <div className="md-spotlight" aria-hidden="true" />}
        <div className="md-hero-scrim" />
        <div className="md-hero-vignette" aria-hidden="true" />
        <div className="md-letterbox md-letterbox--top" />
        <div className="md-letterbox md-letterbox--bottom" />

        <button className="md-back" onClick={() => navigate(-1)} aria-label="Go back" type="button">
          <ChevronLeftIcon />
          <span>Back</span>
        </button>

        <div className="md-hero-inner">
          <motion.div
            className="md-poster-wrap"
            ref={posterRef}
            onMouseMove={handlePosterMove}
            onMouseLeave={handlePosterLeave}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 1, ease: EASE }}
            style={{ perspective: 900 }}
          >
            <motion.div className="md-poster" style={{ rotateX: rXs, rotateY: rYs }}>
              {posterUrl && <div className="md-poster-glow" style={{ backgroundImage: `url(${posterUrl})` }} />}
              {posterUrl ? (
                <img src={posterUrl} alt={movie.title} />
              ) : (
                <div className="movie-poster-fallback">
                  <FilmIcon />
                  <span>No Poster</span>
                </div>
              )}
              {movie.vote_average > 0 && (
                <div className="md-score-badge">
                  <ScoreRing score={movie.vote_average} color={ratingColor} />
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="md-info"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 1, ease: EASE, delay: 0.1 }}
          >
            <p className="md-eyebrow">
              {year}{director ? ` · Directed by ${director.name}` : ""}
            </p>
            <h1 className="md-title">{movie.title}</h1>
            {movie.tagline && <p className="md-tagline">&ldquo;{movie.tagline}&rdquo;</p>}

            <div className="md-meta-row">
              {formatRuntime(movie.runtime) ? (
                <span className="md-meta-chip"><ClockIcon />{formatRuntime(movie.runtime)}</span>
              ) : null}
              {movie.vote_count ? (
                <span className="md-meta-chip"><UsersIcon />{movie.vote_count.toLocaleString()} votes</span>
              ) : null}
              {movie.original_language ? (
                <span className="md-meta-chip"><GlobeIcon />{movie.original_language.toUpperCase()}</span>
              ) : null}
            </div>

            <div className="md-actions">
              <GlowButton active={isFav} onClick={handleFavorite} disabled={actionLoading} icon={<HeartIcon filled={isFav} />} label="Favorite" tone="ember" />
              <GlowButton active={isWatchlist} onClick={handleWatchlist} disabled={actionLoading} icon={<BookmarkIcon filled={isWatchlist} />} label="Watchlist" tone="teal" />
              {userRating ? (
                <div className="gb-wrap gb-wrap--md">
                  <motion.button
                    type="button"
                    className="gb gb--gold gb--active gb--score"
                    onClick={() => setShowRatingModal(true)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label={`Your rating ${userRating.toFixed(1)}`}
                  >
                    <motion.span className="gb-halo" animate={{ opacity: [0.4, 1, 0.6, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
                    <span className="gb-score-value">{userRating.toFixed(1)}</span>
                  </motion.button>
                  <button className="gb-remove" onClick={handleRemoveRatingDirect} disabled={actionLoading} aria-label="Clear your rating" type="button">
                    <CloseIcon />
                  </button>
                  <span className="gb-label">Your Rating</span>
                </div>
              ) : isFav ? (
                <GlowButton active={false} onClick={() => setShowRatingModal(true)} icon={<StarIcon />} label="Rate" tone="gold" />
              ) : null}
            </div>
          </motion.div>
        </div>

        <div ref={sentinelRef} className="md-hero-sentinel" />
        <div className="md-scroll-cue" aria-hidden="true"><span /></div>
      </section>

      {/* ── Overview ──────────────────────────────── */}
      {movie.overview && (
        <Section>
          <SectionHeading eyebrow="The Story" title="Overview" />
          <p className="md-overview-text">{movie.overview}</p>
        </Section>
      )}

      {/* ── Movie Information + Statistics + Production ── */}
      <Section>
        <SectionHeading eyebrow="The Details" title="Movie Information" />
        <div className="md-info-grid">
          {movie.status && (
            <div className="md-fact">
              <span className="md-fact-icon"><TicketIcon /></span>
              <span className="md-fact-label">Status</span>
              <span className="md-fact-value">{movie.status}</span>
            </div>
          )}
          {movie.release_date && (
            <div className="md-fact">
              <span className="md-fact-icon"><CalendarIcon /></span>
              <span className="md-fact-label">Release Date</span>
              <span className="md-fact-value">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
          {formatRuntime(movie.runtime) && (
            <div className="md-fact">
              <span className="md-fact-icon"><ClockIcon /></span>
              <span className="md-fact-label">Runtime</span>
              <span className="md-fact-value">{formatRuntime(movie.runtime)}</span>
            </div>
          )}
          {movie.original_language && (
            <div className="md-fact">
              <span className="md-fact-icon"><GlobeIcon /></span>
              <span className="md-fact-label">Language</span>
              <span className="md-fact-value">{movie.original_language.toUpperCase()}</span>
            </div>
          )}
          {movie.vote_average > 0 && (
            <div className="md-fact">
              <span className="md-fact-icon"><StarIcon filled /></span>
              <span className="md-fact-label">Audience Score</span>
              <span className="md-fact-value">{movie.vote_average.toFixed(1)} / 10</span>
            </div>
          )}
          {movie.vote_count > 0 && (
            <div className="md-fact">
              <span className="md-fact-icon"><UsersIcon /></span>
              <span className="md-fact-label">Votes Cast</span>
              <span className="md-fact-value">{movie.vote_count.toLocaleString()}</span>
            </div>
          )}
          {budget > 0 && (
            <div className="md-fact">
              <span className="md-fact-icon"><DollarIcon /></span>
              <span className="md-fact-label">Budget</span>
              <span className="md-fact-value">{formatCurrency(budget)}</span>
            </div>
          )}
          {revenue > 0 && (
            <div className="md-fact">
              <span className="md-fact-icon"><DollarIcon /></span>
              <span className="md-fact-label">Revenue</span>
              <span className="md-fact-value">{formatCurrency(revenue)}</span>
            </div>
          )}
        </div>

        {profit !== null && (
          <p className={`md-money-net ${profit >= 0 ? "md-money-net--positive" : "md-money-net--negative"}`}>
            {profit >= 0 ? "+" : ""}{formatCurrency(Math.abs(profit))} {profit >= 0 ? "net gain" : "net loss"}
            {multiplier ? ` · ${multiplier.toFixed(1)}× return` : ""}
          </p>
        )}

        {movie.genres?.length ? (
          <div className="md-companies">
            <h4 className="md-subheading">Genres</h4>
            <div className="md-companies-row">
              {movie.genres.map((g) => (
                <span key={g.id} className="md-genre-pill">{g.name}</span>
              ))}
            </div>
          </div>
        ) : null}

        {movie.production_companies?.length ? (
          <div className="md-companies">
            <h4 className="md-subheading">Production</h4>
            <div className="md-companies-row">
              {movie.production_companies.map((company) => (
                <div key={company.id} className="md-company-chip">
                  {company.logo_path ? (
                    <img src={`${TMDB_IMG}w92${company.logo_path}`} alt={company.name} />
                  ) : (
                    <span>{company.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Section>

      {/* ── Cast & Crew ───────────────────────────── */}
      {(director || movie.cast?.length) && (
        <Section className="md-section--tinted">
          <SectionHeading eyebrow="Cast & Crew" title="Who Made It" />
          {director && (
            <div className="md-director-spotlight">
              <div className="md-director-photo">
                {director.profile_path ? (
                  <img src={`${TMDB_IMG}w185${director.profile_path}`} alt={director.name} />
                ) : (
                  <Avatar name={director.name} size={72} />
                )}
              </div>
              <div>
                <span className="md-director-label">Director</span>
                <p className="md-director-name">{director.name}</p>
              </div>
            </div>
          )}
          {movie.cast?.length ? (
            <Rail>
              {movie.cast.map((person) => (
                <motion.div key={person.id} className="md-cast-card" whileHover={{ y: -8, scale: 1.03 }} transition={{ duration: 0.3, ease: EASE }}>
                  <div className="md-cast-photo">
                    {person.profile_path ? (
                      <img src={`${TMDB_IMG}w185${person.profile_path}`} alt={person.name} />
                    ) : (
                      <div className="md-cast-fallback"><Avatar name={person.name} size={80} /></div>
                    )}
                    <div className="md-cast-caption">
                      <p className="md-cast-name">{person.name}</p>
                      <p className="md-cast-role">{person.character}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Rail>
          ) : null}
        </Section>
      )}

      {/* ── Media ─────────────────────────────────── */}
      {(movie.trailer || movie.videos?.length) && (
        <Section>
          {movie.trailer && (
            <>
              <SectionHeading eyebrow="Watch" title="Trailer" />
              <div className="md-video-container">
                {trailerPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.trailer.key}?autoplay=1&rel=0`}
                    title={movie.trailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    className="md-trailer-poster"
                    style={{ backgroundImage: `url(${trailerThumb})` }}
                    onClick={() => setTrailerPlaying(true)}
                    type="button"
                    aria-label={`Play trailer: ${movie.trailer.name}`}
                  >
                    <span className="md-trailer-scrim" />
                    <motion.span
                      className="md-trailer-play"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      animate={reducedMotion ? {} : { boxShadow: ["0 0 0 0 rgba(240,180,41,0.35)", "0 0 0 22px rgba(240,180,41,0)"] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    >
                      <PlayIcon />
                    </motion.span>
                    <span className="md-trailer-name">{movie.trailer.name}</span>
                  </button>
                )}
              </div>
            </>
          )}
          {movie.videos?.length ? (
            <div className="md-videos-grid">
              {movie.videos.slice(0, 6).map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md-video-card"
                >
                  <div className="md-video-thumb">
                    <img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} alt={video.name} />
                    <span className="md-video-play"><PlayIcon /></span>
                  </div>
                  <p className="md-video-name">{video.name}</p>
                  <p className="md-video-type">{video.type}</p>
                </a>
              ))}
            </div>
          ) : null}
        </Section>
      )}

      {/* ── Recommendations ───────────────────────── */}
      {movie.recommendations?.length ? (
        <Section className="md-section--tinted">
          <SectionHeading eyebrow="Curated For You" title="Recommendations" />
          <Rail>
            {movie.recommendations.slice(0, 12).map((m) => (
              <Link to={`/movie/${m.id}`} key={m.id} className="md-poster-card">
                <motion.div className="md-poster-card-inner" whileHover={{ scale: 1.06, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>
                  {m.poster_path ? (
                    <img src={`${TMDB_IMG}w342${m.poster_path}`} alt={m.title} />
                  ) : (
                    <div className="md-poster-card-fallback"><FilmIcon /></div>
                  )}
                  <span className="md-poster-card-scrim" />
                  {m.vote_average > 0 && <span className="md-poster-card-score">★ {m.vote_average.toFixed(1)}</span>}
                </motion.div>
                <p className="md-poster-card-title">{m.title}</p>
              </Link>
            ))}
          </Rail>
        </Section>
      ) : null}

      {/* ── Similar Movies ─────────────────────────── */}
      {movie.similar?.length ? (
        <Section>
          <SectionHeading eyebrow="More Like This" title="Similar Movies" />
          <Rail>
            {movie.similar.slice(0, 12).map((m) => (
              <Link to={`/movie/${m.id}`} key={m.id} className="md-poster-card">
                <motion.div className="md-poster-card-inner" whileHover={{ scale: 1.06, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>
                  {m.poster_path ? (
                    <img src={`${TMDB_IMG}w342${m.poster_path}`} alt={m.title} />
                  ) : (
                    <div className="md-poster-card-fallback"><FilmIcon /></div>
                  )}
                  <span className="md-poster-card-scrim" />
                  {m.vote_average > 0 && <span className="md-poster-card-score">★ {m.vote_average.toFixed(1)}</span>}
                </motion.div>
                <p className="md-poster-card-title">{m.title}</p>
              </Link>
            ))}
          </Rail>
        </Section>
      ) : null}

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        movieId={movie.id}
        movieTitle={movie.title}
        currentRating={userRating}
        onRated={handleRated}
        onRemoved={handleRatingRemoved}
      />
    </div>
  );
}

export default MovieDetail;