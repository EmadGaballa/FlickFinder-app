import bcrypt from "bcryptjs";
import { prisma } from "../prisma/client.js";
import { signToken } from "../utils/jwt.js";
import { AppError } from "../middleware/errorHandler.js";
import { config } from "../utils/config.js";

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
        : "Username already taken"
    );
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
  return {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

export function getClearCookieOptions() {
  return {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax" as const,
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
  newPassword: string
): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, "User not found");

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    throw new AppError(401, "Current password is incorrect");
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
}