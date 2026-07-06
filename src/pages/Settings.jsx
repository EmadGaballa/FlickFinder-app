import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usersApi, authApi } from "../services/backendApi";
import AvatarPicker from "../components/AvatarPicker";
import { getAvatarById } from "../data/avatars/index";
import "../css/Settings.css";

function Settings() {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("1");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
    if (user) {
      setDisplayName(user.displayName || "");
      setAvatar(user.avatar || "1");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    document.title = "Settings — FlickFinder";
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      await usersApi.updateProfile({
        displayName: displayName !== user.displayName ? displayName : undefined,
        avatar: avatar !== user.avatar ? avatar : undefined,
      });
      await refreshUser();
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "New password must be at least 8 characters",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    setSaving(true);
    try {
      await authApi.changePassword({
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage({ type: "success", text: "Password changed successfully" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    await refreshUser();
    navigate("/");
  };

  if (authLoading || !user) {
    return (
      <div className="settings-page">
        <div className="settings-skeleton">
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line medium" />
        </div>
      </div>
    );
  }

  const selectedAvatar = getAvatarById(avatar);
  const AvatarPreview = selectedAvatar?.Icon;

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage your account preferences</p>
      </div>

      <div className="settings-content">
        {message.text && (
          <div className={`settings-message settings-message--${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Profile Section */}
        <section className="settings-section">
          <div className="settings-profile-card">
            <form onSubmit={handleSaveProfile} className="settings-form">
              {/* Large avatar preview */}
              <div className="settings-avatar-preview">
                {AvatarPreview && <AvatarPreview size={96} />}
                <div className="settings-avatar-preview-label">
                  Choose your avatar
                </div>
              </div>

              {/* Inline avatar picker */}
              <div className="settings-avatar-picker-wrap">
                <AvatarPicker
                  selectedId={avatar}
                  onSelect={(id) => setAvatar(id)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="form-input form-input--disabled"
                />
                <span className="form-hint">
                  Username is permanent and cannot be changed.
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="form-input"
                  placeholder="Your display name"
                />
                <span className="form-hint">
                  Can be changed once every 10 days.
                </span>
              </div>

              <button
                type="submit"
                className="settings-submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>
        </section>
        
        {/* Security Section */}
        <section className="settings-section">
          <h2 className="settings-section-title">Security</h2>
          <form onSubmit={handleChangePassword} className="settings-form">
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-input"
                placeholder="Enter current password"
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-input"
                placeholder="At least 8 characters"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                placeholder="Repeat new password"
              />
            </div>

            <button type="submit" className="settings-submit" disabled={saving}>
              {saving ? "Updating..." : "Change Password"}
            </button>
          </form>
        </section>

        {/* Account Section */}
        <section className="settings-section settings-section--danger">
          <h2 className="settings-section-title">Account</h2>
          <button onClick={handleLogout} className="settings-logout-btn">
            Sign Out
          </button>
        </section>
      </div>
    </div>
  );
}

export default Settings;
