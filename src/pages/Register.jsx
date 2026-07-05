import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../services/backendApi";
import AvatarPicker from "../components/AvatarPicker";
import Avatar from "../components/Avatar";
import "../css/Auth.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "1",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create Account — FlickFinder";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.username || form.username.length < 3) errs.username = "Username must be at least 3 characters";
    if (!form.displayName) errs.displayName = "Display name is required";
    if (!form.email || !form.email.includes("@")) errs.email = "Valid email is required";
    if (!form.password || form.password.length < 8) errs.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        username: form.username,
        displayName: form.displayName,
        email: form.email,
        password: form.password,
        avatar: form.avatar,
      });
      navigate("/");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join FlickFinder to save favorites, build watchlists, and connect with friends.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {serverError && <div className="auth-error">{serverError}</div>}

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`form-input${errors.username ? " form-input--error" : ""}`}
              placeholder="Choose a unique username"
              autoComplete="username"
            />
            {errors.username && <span className="form-error">{errors.username}</span>}
            <span className="form-hint">Letters, numbers, underscores. This cannot be changed later.</span>
          </div>

          <div className="form-group">
            <label className="form-label">Display Name</label>
            <input
              type="text"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              className={`form-input${errors.displayName ? " form-input--error" : ""}`}
              placeholder="How others will see you"
              autoComplete="name"
            />
            {errors.displayName && <span className="form-error">{errors.displayName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`form-input${errors.email ? " form-input--error" : ""}`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`form-input${errors.password ? " form-input--error" : ""}`}
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`form-input${errors.confirmPassword ? " form-input--error" : ""}`}
              placeholder="Repeat your password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Choose Avatar</label>
            <button type="button" className="avatar-select-btn" onClick={() => setShowPicker(true)}>
              <Avatar id={form.avatar} size={32} />
              <span>Click to choose avatar</span>
            </button>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </form>
      </div>

      {showPicker && (
        <AvatarPicker
          selectedId={form.avatar}
          onSelect={(id) => setForm((f) => ({ ...f, avatar: id }))}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}

export default Register;