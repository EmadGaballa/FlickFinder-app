import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usersApi, friendsApi } from "../services/backendApi";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "./Avatar";
import ConfirmModal from "./ConfirmModal";
import "../css/FriendSearch.css";
import "../css/ConfirmModal.css";

function FriendSearch() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [relationshipCache, setRelationshipCache] = useState({});
  const [removeTarget, setRemoveTarget] = useState(null);
  const [friendLoading, setFriendLoading] = useState(false);
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const handleSearch = useCallback(async (q) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    if (q.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await usersApi.search(q);
      setResults(data.users || []);
      // Initialize relationship cache
      const cache = {};
      (data.users || []).forEach((u) => {
        cache[u.username] = u.relationshipStatus;
      });
      setRelationshipCache(cache);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Search failed:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, handleSearch]);

  const handleAction = async (username, action) => {
    try {
      if (action === "add") {
        await friendsApi.sendRequest(username);
        setRelationshipCache((prev) => ({ ...prev, [username]: "OUTGOING_REQUEST" }));
      } else if (action === "cancel") {
        await friendsApi.cancelRequest(username);
        setRelationshipCache((prev) => ({ ...prev, [username]: "NONE" }));
      } else if (action === "accept") {
        await friendsApi.acceptRequest(username);
        setRelationshipCache((prev) => ({ ...prev, [username]: "FRIEND" }));
      } else if (action === "decline") {
        await friendsApi.rejectRequest(username);
        setRelationshipCache((prev) => ({ ...prev, [username]: "NONE" }));
      } else if (action === "remove") {
        await friendsApi.removeFriend(username);
        setRelationshipCache((prev) => ({ ...prev, [username]: "NONE" }));
        setRemoveTarget(null);
      }
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  const getStatus = (username) => relationshipCache[username] || "NONE";

  return (
    <div className="friend-search">
      <div className="friend-search-field">
        <svg className="friend-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="friend-search-input"
          placeholder="Search by username or display name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {query && (
          <button className="friend-search-clear" onClick={() => setQuery("")}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          </button>
        )}
      </div>

      {loading && (
        <div className="friend-search-loading">
          <div className="loader-dots"><span /><span /><span /></div>
        </div>
      )}

      {!loading && query.length >= 3 && results.length === 0 && (
        <div className="friend-search-empty">
          <span>🔍</span> No users found matching "{query}"
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="friend-search-results">
          {results.map((user) => {
            const status = getStatus(user.username);
            return (
              <div key={user.id} className="user-search-card">
                <div className="user-search-card-main">
                  <div className="user-search-card-avatar">
                    <Avatar id={user.avatar} size={48} />
                  </div>
                  <div className="user-search-card-info">
                    <h3 className="user-search-card-name">{user.displayName}</h3>
                    <p className="user-search-card-username">@{user.username}</p>
                    <p className="user-search-card-meta">
                      Member since {new Date(user.createdAt).toLocaleDateString()} · {user.friendCount} friends
                    </p>
                  </div>
                </div>
                <div className="user-search-card-actions">
                  <button
                    className="user-search-card-btn user-search-card-btn--secondary"
                    onClick={() => navigate(`/profile/${user.username}`)}
                  >
                    Collection
                  </button>
                  {status === "SELF" ? (
                    <span className="user-search-card-status">You</span>
                  ) : status === "FRIEND" ? (
                    <>
                      <span className="user-search-card-status user-search-card-status--friend">✓ Friends</span>
                      <button
                        className="user-search-card-btn user-search-card-btn--danger"
                        onClick={() => setRemoveTarget(user)}
                      >
                        Remove
                      </button>
                    </>
                  ) : status === "OUTGOING_REQUEST" ? (
                    <>
                      <span className="user-search-card-status user-search-card-status--pending">Pending</span>
                      <button
                        className="user-search-card-btn user-search-card-btn--danger"
                        onClick={() => handleAction(user.username, "cancel")}
                      >
                        Cancel
                      </button>
                    </>
                  ) : status === "INCOMING_REQUEST" ? (
                    <>
                      <button
                        className="user-search-card-btn user-search-card-btn--primary"
                        onClick={() => handleAction(user.username, "accept")}
                      >
                        Accept
                      </button>
                      <button
                        className="user-search-card-btn user-search-card-btn--danger"
                        onClick={() => handleAction(user.username, "decline")}
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <button
                      className="user-search-card-btn user-search-card-btn--primary"
                      onClick={() => handleAction(user.username, "add")}
                    >
                      Add Friend
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmModal
        isOpen={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        onConfirm={() => handleAction(removeTarget?.username, "remove")}
        title="Remove Friend"
        message={`Are you sure you want to remove ${removeTarget?.displayName} from your friends? You can always send another friend request later.`}
        confirmLabel="Remove Friend"
        confirmDanger={true}
        loading={friendLoading}
      />
    </div>
  );
}

export default FriendSearch;
