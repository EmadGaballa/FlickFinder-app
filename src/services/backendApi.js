const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api" : "http://localhost:3001/api");

async function request(endpoint, options = {}) {
  const config = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  let data = {};

  try {
    data = await response.json();
  } catch { }

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

// ── Auth ────────────────────────────────────────────
export const authApi = {
  register: (body) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),

  login: (body) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),

  logout: () =>
    request("/auth/logout", { method: "POST" }),

  me: () =>
    request("/auth/me"),

  changePassword: (body) =>
    request("/auth/change-password", { method: "POST", body: JSON.stringify(body) }),

  getPasswordCooldown: () =>
    request("/auth/password-cooldown"),
};

// ── Users ───────────────────────────────────────────
export const usersApi = {
  getProfile: (username) =>
    request(`/users/${username}`),

  updateProfile: (body) =>
    request("/users/profile", { method: "PATCH", body: JSON.stringify(body) }),

  search: (query) =>
    request(`/users/search?query=${encodeURIComponent(query)}`),
};

// ── Favorites ───────────────────────────────────────
export const favoritesApi = {
  getMyFavorites: () =>
    request("/favorites"),

  getUserFavorites: (username) =>
    request(`/favorites/user/${username}`),

  getMyFavoriteIds: () =>
    request("/favorites/ids"),

  addFavorite: (movieId) =>
    request("/favorites", { method: "POST", body: JSON.stringify({ movieId }) }),

  removeFavorite: (movieId) =>
    request(`/favorites/${movieId}`, { method: "DELETE" }),
};

// ── Watchlist ───────────────────────────────────────
export const watchlistApi = {
  getMyWatchlist: () =>
    request("/watchlist"),

  getUserWatchlist: (username) =>
    request(`/watchlist/user/${username}`),

  getMyWatchlistIds: () =>
    request("/watchlist/ids"),

  addToWatchlist: (movieId) =>
    request("/watchlist", { method: "POST", body: JSON.stringify({ movieId }) }),

  removeFromWatchlist: (movieId) =>
    request(`/watchlist/${movieId}`, { method: "DELETE" }),
};

// ── Ratings ─────────────────────────────────────────
export const ratingsApi = {
  rateMovie: (movieId, score) =>
    request("/ratings", { method: "POST", body: JSON.stringify({ movieId, score }) }),

  removeRating: (movieId) =>
    request(`/ratings/${movieId}`, { method: "DELETE" }),

  getMyRatings: () =>
    request("/ratings/mine"),

  getUserRatings: (username) =>
    request(`/ratings/user/${username}`),
};

// ── Friends ─────────────────────────────────────────
export const friendsApi = {
  sendRequest: (username) =>
    request(`/friends/request/${username}`, { method: "POST" }),

  acceptRequest: (username) =>
    request(`/friends/accept/${username}`, { method: "POST" }),

  rejectRequest: (username) =>
    request(`/friends/reject/${username}`, { method: "POST" }),

  cancelRequest: (username) =>
    request(`/friends/request/${username}`, { method: "DELETE" }),

  removeFriend: (username) =>
    request(`/friends/remove/${username}`, { method: "DELETE" }),

  getFriends: () =>
    request("/friends"),

  getRequests: () =>
    request("/friends/requests"),
};
