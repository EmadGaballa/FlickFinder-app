import { useState, useEffect } from "react";
import { usersApi, friendsApi } from "../services/backendApi";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../components/Avatar";
import "../css/UserSearch.css";

function UserSearch() {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [friendStatus, setFriendStatus] = useState({});
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      setSearched(true);
      try {
        const data = await usersApi.search(query.trim());
        setResults(data.users);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    async function loadFriendStatus() {
      try {
        const data = await friendsApi.getFriends();
        if (cancelled) return;
        const map = {};
        data.friends.forEach((f) => { map[f.username] = true; });
        setFriendStatus(map);
      } catch {
        // ignore
      }
    }
    loadFriendStatus();
    return () => { cancelled = true; };
  }, [isAuthenticated]);

  const handleFriendAction = async (username) => {
    setActionLoading((l) => ({ ...l, [username]: true }));
    try {
      await friendsApi.sendRequest(username);
      setFriendStatus((s) => ({ ...s, [username]: true }));
    } catch {
      // ignore
    } finally {
      setActionLoading((l) => ({ ...l, [username]: false }));
    }
  };

  return (
    <div className="search-users-page">
      <div className="search-users-header">
        <h1 className="search-users-title">Find Friends</h1>
        <p className="search-users-subtitle">Search for other movie lovers by username or display name.</p>
      </div>

      <div className="search-users-form">
        <div className="search-users-inner">
          <svg className="search-users-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-users-input"
            placeholder="Search by username or display name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div className="search-users-results">
        {loading && (
          <div className="search-users-loading">
            <div className="loader-dots"><span /><span /><span /></div>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="no-results">
            <span>🔍</span> No users found matching "{query}"
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="users-list">
            {results.map((user) => {
              const isFriend = !!friendStatus[user.username];
              return (
                <div key={user.id} className="user-card">
                  <Link to={`/profile/${user.username}`} className="user-card-link">
                    <div className="user-card-avatar">
                      <Avatar id={user.avatar} size={48} />
                    </div>
                    <div className="user-card-info">
                      <h3 className="user-card-name">{user.displayName}</h3>
                      <p className="user-card-username">@{user.username}</p>
                      <p className="user-card-friends">{user._count.favorites} favorites</p>
                    </div>
                  </Link>
                  <div className="user-card-action">
                    {isAuthenticated && !isFriend && (
                      <button
                        className="friend-add-btn"
                        onClick={() => handleFriendAction(user.username)}
                        disabled={actionLoading[user.username]}
                      >
                        {actionLoading[user.username] ? "..." : "Add Friend"}
                      </button>
                    )}
                    {isFriend && (
                      <span className="friend-added-badge">✓ Friend</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSearch;