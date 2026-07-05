import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { friendsApi } from "../services/backendApi";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../components/Avatar";
import "../css/Friends.css";

function Friends() {
  const { isAuthenticated } = useAuth();
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState({ received: [], sent: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("friends");

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        const [friendsData, requestsData] = await Promise.all([
          friendsApi.getFriends(),
          friendsApi.getRequests(),
        ]);
        if (cancelled) return;
        setFriends(friendsData.friends);
        setRequests(requestsData);
      } catch (err) {
        console.error("Failed to load friends:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [isAuthenticated]);

  const handleAccept = async (username) => {
    try {
      await friendsApi.acceptRequest(username);
      const [friendsData, requestsData] = await Promise.all([
        friendsApi.getFriends(),
        friendsApi.getRequests(),
      ]);
      setFriends(friendsData.friends);
      setRequests(requestsData);
    } catch (err) {
      console.error("Failed to accept request:", err);
    }
  };

  const handleReject = async (username) => {
    try {
      await friendsApi.rejectRequest(username);
      const data = await friendsApi.getRequests();
      setRequests(data);
    } catch (err) {
      console.error("Failed to reject request:", err);
    }
  };

  const handleRemove = async (username) => {
    try {
      await friendsApi.removeFriend(username);
      const data = await friendsApi.getFriends();
      setFriends(data.friends);
    } catch (err) {
      console.error("Failed to remove friend:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="friends-page">
        <div className="friends-header">
          <h1 className="friends-title">Friends</h1>
          <p className="friends-subtitle">Sign in to connect with friends.</p>
        </div>
        <div className="friends-empty">
          <div className="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h2 className="empty-title">Sign in to use Friends</h2>
          <p className="empty-subtitle">Create an account or sign in to connect with friends.</p>
          <a href="/login" className="empty-cta">Sign In</a>
        </div>
      </div>
    );
  }

  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1 className="friends-title">Friends</h1>
        <p className="friends-subtitle">Manage your connections.</p>
      </div>

      <div className="friends-tabs">
        <button className={`friends-tab${activeTab === "friends" ? " friends-tab--active" : ""}`} onClick={() => setActiveTab("friends")}>
          Friends ({friends.length})
        </button>
        <button className={`friends-tab${activeTab === "requests" ? " friends-tab--active" : ""}`} onClick={() => setActiveTab("requests")}>
          Requests ({requests.received.length})
        </button>
      </div>

      <div className="friends-content">
        {activeTab === "friends" && (
          loading ? (
            <div className="search-users-loading">
              <div className="loader-dots"><span /><span /><span /></div>
            </div>
          ) : friends.length === 0 ? (
            <div className="no-results">
              <span>👤</span> No friends yet. Search for users to add!
            </div>
          ) : (
            <div className="users-list">
              {friends.map((friend) => (
                <div key={friend.id} className="user-card">
                  <Link to={`/profile/${friend.username}`} className="user-card-link">
                    <div className="user-card-avatar">
                      <Avatar id={friend.avatar} size={48} />
                    </div>
                    <div className="user-card-info">
                      <h3 className="user-card-name">{friend.displayName}</h3>
                      <p className="user-card-username">@{friend.username}</p>
                    </div>
                  </Link>
                  <div className="user-card-action">
                    <button className="friends-remove-btn" onClick={() => handleRemove(friend.username)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === "requests" && (
          <div className="friend-requests">
            {requests.received.length > 0 && (
              <div className="request-section">
                <h3 className="request-section-title">Received Requests</h3>
                {requests.received.map((req) => (
                  <div key={req.requestId} className="user-card">
                    <Link to={`/profile/${req.username}`} className="user-card-link">
                      <div className="user-card-avatar">
                        <Avatar id={req.avatar} size={48} />
                      </div>
                      <div className="user-card-info">
                        <h3 className="user-card-name">{req.displayName}</h3>
                        <p className="user-card-username">@{req.username}</p>
                      </div>
                    </Link>
                    <div className="user-card-action">
                      <button className="friends-accept-btn" onClick={() => handleAccept(req.username)}>
                        Accept
                      </button>
                      <button className="friends-reject-btn" onClick={() => handleReject(req.username)}>
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {requests.sent.length > 0 && (
              <div className="request-section">
                <h3 className="request-section-title">Sent Requests</h3>
                {requests.sent.map((req) => (
                  <div key={req.requestId} className="user-card">
                    <Link to={`/profile/${req.username}`} className="user-card-link">
                      <div className="user-card-avatar">
                        <Avatar id={req.avatar} size={48} />
                      </div>
                      <div className="user-card-info">
                        <h3 className="user-card-name">{req.displayName}</h3>
                        <p className="user-card-username">@{req.username}</p>
                        <p className="request-status">
                          {req.status === "pending" ? "⏳ Pending" : req.status}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {requests.received.length === 0 && requests.sent.length === 0 && (
              <div className="no-results">
                <span>📭</span> No pending requests
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;