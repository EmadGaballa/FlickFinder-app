import { useState } from "react";
import { ratingsApi } from "../services/backendApi";

function RatingModal({ isOpen, onClose, movieId, movieTitle, currentRating, onRated }) {
  const [score, setScore] = useState(currentRating || 0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const display = hover || score;

  const handleSubmit = async () => {
    if (!score) return;
    setLoading(true);
    setError("");
    try {
      await ratingsApi.rateMovie(movieId, score);
      onRated?.(score);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating-modal-overlay" onClick={onClose}>
      <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="rating-modal-title">Rate "{movieTitle}"</h2>
        <p className="rating-modal-subtitle">Your rating helps others discover great films</p>

        <div className="rating-stars">
          {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map((val) => (
            <button
              key={val}
              className={`rating-star ${val <= display ? "rating-star--active" : ""}`}
              onClick={() => setScore(val)}
              onMouseEnter={() => setHover(val)}
              onMouseLeave={() => setHover(0)}
            >
              {val}
            </button>
          ))}
        </div>

        {score > 0 && (
          <p className="rating-selected">Selected: <strong>{score}/10</strong></p>
        )}

        {error && <p className="rating-error">{error}</p>}

        <div className="rating-actions">
          <button className="rating-btn rating-btn--skip" onClick={onClose} disabled={loading}>
            Skip
          </button>
          <button
            className="rating-btn rating-btn--save"
            onClick={handleSubmit}
            disabled={!score || loading}
          >
            {loading ? "Saving..." : "Save Rating"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;