import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "./Avatar";
import "../css/NavBar.css";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    navigate("/", { state: { focusSearch: true } });
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`navbar${scrolled ? " navbar--scrolled" : ""}${menuOpen ? " navbar--open" : ""}`}
    >
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
            <circle cx="5" cy="12" r="1.5" fill="currentColor" />
            <circle cx="19" cy="12" r="1.5" fill="currentColor" />
            <circle cx="7.4" cy="7.4" r="1.5" fill="currentColor" />
            <circle cx="16.6" cy="16.6" r="1.5" fill="currentColor" />
            <circle cx="16.6" cy="7.4" r="1.5" fill="currentColor" />
            <circle cx="7.4" cy="16.6" r="1.5" fill="currentColor" />
          </svg>
        </span>
        <span className="logo-text">
          Flick<em>Finder</em>
        </span>
      </Link>

      <div className="navbar-links">
        <button
          onClick={handleDiscoverClick}
          className={`nav-link${isActive("/") ? " nav-link--active" : ""}`}
        >
          Discover
        </button>
        {!loading && user && (
          <>
            <Link
              to={`/profile/${user.username}`}
              className={`nav-link${
                location.pathname === `/profile/${user.username}`
                  ? " nav-link--active"
                  : ""
              }`}
            >
              Collection
            </Link>

            <div className="navbar-profile" ref={profileRef}>
              <button
                className="nav-link nav-profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <Avatar id={user.avatar} size={24} />
                <span className="nav-profile-name">{user.displayName}</span>
                <svg
                  className="nav-profile-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {profileOpen && (
                <div className="nav-profile-dropdown">
        
                  <Link
                    to="/friends"
                    className="nav-dropdown-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <span>👥</span> Friends
                  </Link>

                  <Link
                    to="/settings"
                    className="nav-dropdown-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <span>⚙️</span> Settings
                  </Link>
                  <hr className="nav-dropdown-divider" />
                  <button
                    className="nav-dropdown-item nav-dropdown-item--logout"
                    onClick={handleLogout}
                  >
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {!loading && !user && (
          <Link to="/login" className="nav-link nav-link--auth">
            Sign In
          </Link>
        )}
      </div>

      <button
        className={`nav-hamburger${menuOpen ? " nav-hamburger--open" : ""}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-drawer${menuOpen ? " nav-drawer--open" : ""}`}>
        <button
          onClick={handleDiscoverClick}
          className={`drawer-link drawer-button${isActive("/") ? " drawer-link--active" : ""}`}
        >
          Discover
        </button>
        {user && (
          <>
            <Link
              to={`/profile/${user.username}?tab=favorites`}
              className={`drawer-link${
                location.pathname === `/profile/${user.username}`
                  ? " drawer-link--active"
                  : ""
              }`}
            >
              Collection
            </Link>
            <Link
              to="/friends"
              className={`drawer-link${isActive("/friends") ? " drawer-link--active" : ""}`}
            >
              Friends
            </Link>
            <Link
              to={`/profile/${user.username}`}
              className={`drawer-link${location.pathname === `/profile/${user.username}` ? " drawer-link--active" : ""}`}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className={`drawer-link${isActive("/settings") ? " drawer-link--active" : ""}`}
            >
              Settings
            </Link>
            <hr className="drawer-divider" />
            <button
              onClick={handleLogout}
              className="drawer-link drawer-button"
            >
              Sign Out
            </button>
          </>
        )}
        {!user && (
          <Link to="/login" className="drawer-link">
            Sign In
          </Link>
        )}
      </div>

      {menuOpen && (
        <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </nav>
  );
}

export default NavBar;
