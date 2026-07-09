import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AvatarPicker from "../components/AvatarPicker";
import { getAvatarById } from "../data/avatars/index";
import PasswordField from "../components/PasswordField";
import PasswordRequirements from "../components/PasswordRequirements";
import { isPasswordStrong } from "../utils/passwordValidation";
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
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  useEffect(() => {
    document.title = "Create Account — FlickFinder";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  useEffect(() => {
    const passwordValid = isPasswordStrong(form.password);
    const passwordsMatch =
      form.password === form.confirmPassword && form.confirmPassword !== "";
    const hasRequiredFields = form.username && form.displayName && form.email;
    setIsFormValid(passwordValid && passwordsMatch && hasRequiredFields);
  }, [form]);

  const validate = () => {
    const errs = {};
    if (!form.username || form.username.length < 3)
      errs.username = "Username must be at least 3 characters";
    if (!form.displayName) errs.displayName = "Display name is required";
    if (!form.email || !form.email.includes("@"))
      errs.email = "Valid email is required";
    if (!isPasswordStrong(form.password)) {
      errs.password = "Password does not meet requirements";
    }
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
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
      await register({
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
          <p className="auth-subtitle">
            Join FlickFinder to save favorites, build watchlists, and connect
            with friends.
          </p>
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
            {errors.username && (
              <span className="form-error">{errors.username}</span>
            )}
            <span className="form-hint">
              Letters, numbers, underscores. This cannot be changed later.
            </span>
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
            {errors.displayName && (
              <span className="form-error">{errors.displayName}</span>
            )}
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
            <PasswordField
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              autoComplete="new-password"
              error={errors.password}
            />
            <PasswordRequirements password={form.password} />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <PasswordField
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
              error={errors.confirmPassword}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Choose Avatar</label>
            <div className="register-avatar-inline">
              <AvatarPicker
                selectedId={form.avatar}
                onSelect={(id) => setForm((f) => ({ ...f, avatar: id }))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading || !isFormValid}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
