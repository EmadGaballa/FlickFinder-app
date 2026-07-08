import { useMemo } from "react";
import { checkPasswordRequirements } from "../utils/passwordValidation";
import "./PasswordRequirements.css";

function PasswordRequirements({ password }) {
  const requirements = useMemo(() => checkPasswordRequirements(password), [password]);

  if (!password) {
    return null;
  }

  return (
    <div className="password-requirements">
      <div className="password-requirements-title">Password Requirements</div>
      <ul className="password-requirements-list">
        {requirements.map((req, index) => (
          <li
            key={index}
            className={`password-requirement ${req.met ? "password-requirement--met" : ""}`}
          >
            <span className="password-requirement-icon">
              {req.met ? "✓" : "✗"}
            </span>
            <span className="password-requirement-label">{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordRequirements;