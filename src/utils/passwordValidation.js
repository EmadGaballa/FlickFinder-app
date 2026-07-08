/**
 * Password validation utilities
 * Centralized password rules used across the application
 */

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 10,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL_CHAR: true,
};

export function checkPasswordRequirements(password) {
  return [
    {
      label: `At least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`,
      test: (pwd) => pwd.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH,
      met: password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH,
    },
    {
      label: "At least one uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
      met: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
      met: /[a-z]/.test(password),
    },
    {
      label: "At least one number",
      test: (pwd) => /[0-9]/.test(pwd),
      met: /[0-9]/.test(password),
    },
    {
      label: "At least one special character",
      test: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pwd),
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password),
    },
  ];
}

export function isPasswordStrong(password) {
  const requirements = checkPasswordRequirements(password);
  return requirements.every((req) => req.met);
}

export function getPasswordStrengthErrors(password) {
  const requirements = checkPasswordRequirements(password);
  return requirements.filter((req) => !req.met).map((req) => req.label);
}