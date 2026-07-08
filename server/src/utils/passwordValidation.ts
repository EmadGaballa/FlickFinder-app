/**
 * Backend password validation utilities
 * Enforces the same password rules as the frontend
 */

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 10,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL_CHAR: true,
};

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

export function checkPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    {
      label: `At least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`,
      met: password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH,
    },
    {
      label: "At least one uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      label: "At least one number",
      met: /[0-9]/.test(password),
    },
    {
      label: "At least one special character",
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password),
    },
  ];
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const requirements = checkPasswordRequirements(password);
  const errors = requirements.filter((req) => !req.met).map((req) => req.label);
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

export function isPasswordStrong(password: string): boolean {
  return validatePassword(password).valid;
}