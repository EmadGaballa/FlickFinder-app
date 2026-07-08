import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { friendsApi } from "../services/backendApi";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../components/Avatar";
import FriendSearch from "../components/FriendSearch";
import ConfirmModal from "../components/ConfirmModal";
import "../css/Friends.css";
import "../css/ConfirmModal.css";

function Friends() {
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState({ received: [], sent: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("friends");
  const [removeTarget, setRemoveTarget] = useState(null);
  const [friendLoading, setFriendLoading] = useState(false);

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

  const handleCancel = async (username) => {
    try {
      await friendsApi.cancelRequest(username);
      const data = await friendsApi.getRequests();
      setRequests(data);
    } catch (err) {
      console.error("Failed to cancel request:", err);
    }
  };

  const handleRemove = async (username) => {
    setFriendLoading(true);
    try {
      await friendsApi.removeFriend(username);
      const data = await friendsApi.getFriends();
      setFriends(data.friends);
      setRemoveTarget(null);
    } catch (err) {
      console.error("Failed to Remove Friend:", err);
    } finally {
      setFriendLoading(false);
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
        <button
          className={`friends-tab${activeTab === "friends" ? " friends-tab--active" : ""}`}
          onClick={() => setActiveTab("friends")}
        >
          Friends ({friends.length})
        </button>
        <button
          className={`friends-tab${activeTab === "requests" ? " friends-tab--active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          Requests ({requests.received.length})
        </button>
        <button
          className={`friends-tab${activeTab === "find" ? " friends-tab--active" : ""}`}
          onClick={() => setActiveTab("find")}
        >
          Find Friends
        </button>
      </div>

      <div className="friends-content">
        {/* Friends Tab */}
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
                <div key={friend.id} className="friend-card">
                  <div className="friend-card-main">
                    <Link to={`/profile/${friend.username}`} className="friend-card-link">
                      <div className="friend-card-avatar">
                        <Avatar id={friend.avatar} size={48} />
                      </div>
                      <div className="friend-card-info">
                        <h3 className="friend-card-name">{friend.displayName}</h3>
                        <p className="friend-card-username">@{friend.username}</p>
                        <p className="friend-card-since">Friend</p>
                      </div>
                    </Link>
                  </div>
                  <div className="friend-card-actions">
                    <button
                      className="friend-card-btn friend-card-btn--secondary"
                      onClick={() => navigate(`/profile/${friend.username}`)}
                    >
                      Collection
                    </button>
                    <button
                      className="friend-card-btn friend-card-btn--danger"
                      onClick={() => setRemoveTarget(friend)}
                    >
                      Remove Friend
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div className="friend-requests">
            {requests.received.length > 0 && (
              <div className="request-section">
                <h3 className="request-section-title">Incoming Requests</h3>
                {requests.received.map((req) => (
                  <div key={req.requestId} className="friend-card">
                    <div className="friend-card-main">
                      <Link to={`/profile/${req.username}`} className="friend-card-link">
                        <div className="friend-card-avatar">
                          <Avatar id={req.avatar} size={48} />
                        </div>
                        <div className="friend-card-info">
                          <h3 className="friend-card-name">{req.displayName}</h3>
                          <p className="friend-card-username">@{req.username}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="friend-card-actions">
                      <button
                        className="friend-card-btn friend-card-btn--primary"
                        onClick={() => handleAccept(req.username)}
                      >
                        Accept
                      </button>
                      <button
                        className="friend-card-btn friend-card-btn--danger"
                        onClick={() => handleReject(req.username)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {requests.sent.length > 0 && (
              <div className="request-section">
                <h3 className="request-section-title">Outgoing Requests</h3>
                {requests.sent.map((req) => (
                  <div key={req.requestId} className="friend-card">
                    <div className="friend-card-main">
                      <Link to={`/profile/${req.username}`} className="friend-card-link">
                        <div className="friend-card-avatar">
                          <Avatar id={req.avatar} size={48} />
                        </div>
                        <div className="friend-card-info">
                          <h3 className="friend-card-name">{req.displayName}</h3>
                          <p className="friend-card-username">@{req.username}</p>
                          <p className="friend-card-status friend-card-status--pending">
                            ⏳ Pending
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="friend-card-actions">
                      <button
                        className="friend-card-btn friend-card-btn--danger"
                        onClick={() => handleCancel(req.username)}
                      >
                        Cancel Request
                      </button>
                    </div>
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

        {/* Find Friends Tab */}
        {activeTab === "find" && (
          <FriendSearch />
        )}
      </div>

      <ConfirmModal
        isOpen={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        onConfirm={() => handleRemove(removeTarget?.username)}
        title="Remove Friend"
        message={`Are you sure you want to remove ${removeTarget?.displayName} from your friends? You can always send another friend request later.`}
        confirmLabel="Remove Friend"
        confirmDanger={true}
        loading={friendLoading}
      />
    </div>
  );
}

export default Friends;
