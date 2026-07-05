import { Link } from "react-router-dom";

function AuthRequiredModal({ isOpen, onClose, title = "Authentication Required", message = "Please sign in to access this feature." }) {
  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-icon">🔒</div>
        <h2 className="auth-modal-title">{title}</h2>
        <p className="auth-modal-message">{message}</p>
        <div className="auth-modal-actions">
          <Link to="/login" className="auth-modal-btn auth-modal-btn--primary" onClick={onClose}>
            Sign In
          </Link>
          <Link to="/register" className="auth-modal-btn auth-modal-btn--secondary" onClick={onClose}>
            Create Account
          </Link>
        </div>
        <button className="auth-modal-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default AuthRequiredModal;