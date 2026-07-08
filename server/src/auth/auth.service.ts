import bcrypt from "bcryptjs";
import { prisma } from "../prisma/client.js";
import { signToken } from "../utils/jwt.js";
import { AppError } from "../middleware/errorHandler.js";
import { config } from "../utils/config.js";
import { isPasswordStrong } from "../utils/passwordValidation.js";

export interface AuthResult {
  user: {
    id: string;
    username: string;
    displayName: string;
    email: string;
    avatar: string | null;
    createdAt: Date;
  };
  token: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string | null;
  createdAt: Date;
  displayNameUpdatedAt: Date | null;
}

export async function register(data: {
  username: string;
  displayName: string;
  email: string;
  password: string;
  avatar?: string;
}): Promise<AuthResult> {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, { username: data.username }],
    },
  });

  if (existingUser) {
    throw new AppError(
      409,
      existingUser.email === data.email
        ? "Email already in use"
        : "Username already taken",
    );
  }

  // Validate password strength
  if (!isPasswordStrong(data.password)) {
    const errors = [
      "Password must contain:",
      "• at least 10 characters",
      "• one uppercase letter",
      "• one lowercase letter",
      "• one number",
      "• one special character",
    ];
    throw new AppError(400, errors.join("\n"));
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      displayName: data.displayName,
      email: data.email,
      passwordHash,
      avatar: data.avatar || "1",
    },
  });

  const token = signToken({ userId: user.id, username: user.username });

  return {
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
    token,
  };
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = signToken({ userId: user.id, username: user.username });

  return {
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
    token,
  };
}

export function getCookieOptions() {
  const isProduction = config.nodeEnv === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

export function getClearCookieOptions() {
  const isProduction = config.nodeEnv === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
  };
}

export async function getMe(userId: string): Promise<UserProfile> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      displayName: true,
      email: true,
      avatar: true,
      createdAt: true,
      displayNameUpdatedAt: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, "User not found");

  // Check password cooldown (3 hours)
  if (user.lastPasswordChangedAt) {
    const cooldownPeriod = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const timeSinceLastChange =
      Date.now() - new Date(user.lastPasswordChangedAt).getTime();

    if (timeSinceLastChange < cooldownPeriod) {
      const remainingTime = cooldownPeriod - timeSinceLastChange;
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
      );

      let message = "You recently changed your password.\n\n";
      if (hours > 0) {
        message += `Please wait another ${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes > 1 ? "s" : ""} before changing it again.`;
      } else {
        message += `Please wait another ${minutes} minute${minutes > 1 ? "s" : ""} before changing it again.`;
      }

      throw new AppError(429, message);
    }
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    throw new AppError(401, "Current password is incorrect");
  }

  // Validate new password strength
  if (!isPasswordStrong(newPassword)) {
    const errors = [
      "Password must contain:",
      "• at least 10 characters",
      "• one uppercase letter",
      "• one lowercase letter",
      "• one number",
      "• one special character",
    ];
    throw new AppError(400, errors.join("\n"));
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash,
      lastPasswordChangedAt: new Date(),
    },
  });
}

export async function getPasswordCooldownInfo(
  userId: string,
): Promise<{ canChange: boolean; nextAllowedAt?: Date }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastPasswordChangedAt: true },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user.lastPasswordChangedAt) {
    return { canChange: true };
  }

  const cooldownPeriod = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  const timeSinceLastChange =
    Date.now() - new Date(user.lastPasswordChangedAt).getTime();

  if (timeSinceLastChange >= cooldownPeriod) {
    return { canChange: true };
  }

  const nextAllowedAt = new Date(
    new Date(user.lastPasswordChangedAt).getTime() + cooldownPeriod,
  );
  return {
    canChange: false,
    nextAllowedAt,
  };
}
