import { prisma } from "../prisma/client.js";
import { AppError } from "../middleware/errorHandler.js";

export interface FriendUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string | null;
}

export interface FriendRequestWithUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  requestId: string;
  createdAt: Date;
  status?: string;
}

export async function sendFriendRequest(
  senderId: string,
  targetUsername: string,
): Promise<{ message: string; status?: number }> {
  const targetUser = await prisma.user.findUnique({
    where: { username: targetUsername },
  });

  if (!targetUser) {
    throw new AppError(404, "User not found");
  }

  if (targetUser.id === senderId) {
    throw new AppError(400, "Cannot send friend request to yourself");
  }

  // Check existing request
  const existing = await prisma.friendRequest.findUnique({
    where: { senderId_receiverId: { senderId, receiverId: targetUser.id } },
  });

  if (existing) {
    if (existing.status === "pending") {
      throw new AppError(409, "Friend request already sent");
    }
    if (existing.status === "accepted") {
      throw new AppError(409, "Already friends");
    }
    // If rejected, update to pending
    await prisma.friendRequest.update({
      where: { id: existing.id },
      data: { status: "pending" },
    });
    return { message: "Friend request sent" };
  }

  // Check if they sent us a request
  const reverse = await prisma.friendRequest.findUnique({
    where: {
      senderId_receiverId: { senderId: targetUser.id, receiverId: senderId },
    },
  });

  if (reverse) {
    // Auto-accept
    await prisma.friendRequest.update({
      where: { id: reverse.id },
      data: { status: "accepted" },
    });

    await prisma.friendship.createMany({
      data: [
        { userId: senderId, friendId: targetUser.id },
        { userId: targetUser.id, friendId: senderId },
      ],
    });

    return { message: "Friend request accepted (mutual)" };
  }

  await prisma.friendRequest.create({
    data: { senderId, receiverId: targetUser.id },
  });

  return { message: "Friend request sent", status: 201 };
}

export async function acceptFriendRequest(
  receiverId: string,
  senderUsername: string,
): Promise<void> {
  const sender = await prisma.user.findUnique({
    where: { username: senderUsername },
  });

  if (!sender) {
    throw new AppError(404, "User not found");
  }

  const request = await prisma.friendRequest.findUnique({
    where: { senderId_receiverId: { senderId: sender.id, receiverId } },
  });

  if (!request || request.status !== "pending") {
    throw new AppError(404, "No pending friend request found");
  }

  await prisma.friendRequest.update({
    where: { id: request.id },
    data: { status: "accepted" },
  });

  await prisma.friendship.createMany({
    data: [
      { userId: receiverId, friendId: sender.id },
      { userId: sender.id, friendId: receiverId },
    ],
  });
}

export async function rejectFriendRequest(
  receiverId: string,
  senderUsername: string,
): Promise<void> {
  const sender = await prisma.user.findUnique({
    where: { username: senderUsername },
  });

  if (!sender) {
    throw new AppError(404, "User not found");
  }

  const request = await prisma.friendRequest.findUnique({
    where: { senderId_receiverId: { senderId: sender.id, receiverId } },
  });

  if (!request || request.status !== "pending") {
    throw new AppError(404, "No pending friend request found");
  }

  await prisma.friendRequest.update({
    where: { id: request.id },
    data: { status: "rejected" },
  });
}

export async function cancelFriendRequest(
  senderId: string,
  targetUsername: string,
): Promise<void> {
  const target = await prisma.user.findUnique({
    where: { username: targetUsername },
  });

  if (!target) {
    throw new AppError(404, "User not found");
  }

  const request = await prisma.friendRequest.findUnique({
    where: { senderId_receiverId: { senderId, receiverId: target.id } },
  });

  if (!request || request.status !== "pending") {
    throw new AppError(404, "No pending friend request found");
  }

  await prisma.friendRequest.delete({
    where: { id: request.id },
  });
}

export async function removeFriend(
  userId: string,
  friendUsername: string,
): Promise<void> {
  const friend = await prisma.user.findUnique({
    where: { username: friendUsername },
  });

  if (!friend) {
    throw new AppError(404, "User not found");
  }

  await prisma.friendship.deleteMany({
    where: {
      OR: [
        { userId, friendId: friend.id },
        { userId: friend.id, friendId: userId },
      ],
    },
  });

  // Update any friend request
  await prisma.friendRequest.updateMany({
    where: {
      OR: [
        { senderId: userId, receiverId: friend.id },
        { senderId: friend.id, receiverId: userId },
      ],
    },
    data: { status: "rejected" },
  });
}

export async function getFriends(userId: string): Promise<FriendUser[]> {
  const friendships = await prisma.friendship.findMany({
    where: { userId },
    include: {
      friend: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true,
        },
      },
    },
  });

  return friendships.map((f) => f.friend);
}

export async function getFriendRequests(userId: string): Promise<{
  received: FriendRequestWithUser[];
  sent: FriendRequestWithUser[];
}> {
  const received = await prisma.friendRequest.findMany({
    where: { receiverId: userId, status: "pending" },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const sent = await prisma.friendRequest.findMany({
    where: {
      senderId: userId,
      status: "pending",
    },
    include: {
      receiver: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    received: received.map((r) => ({
      ...r.sender,
      requestId: r.id,
      createdAt: r.createdAt,
    })),
    sent: sent.map((s) => ({
      ...s.receiver,
      requestId: s.id,
      status: s.status,
      createdAt: s.createdAt,
    })),
  };
}
