import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/backendApi";
import { useUserMovies } from "./UserMoviesContext";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loadUserMovies, clearUserMovies } = useUserMovies();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await authApi.me();
        if (!cancelled) setUser(data.user);
        await loadUserMovies();
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshUser = async () => {
    try {
      const data = await authApi.me();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  const login = async (credentials) => {
    await authApi.login(credentials);

    const me = await authApi.me();

    setUser(me.user);

    await loadUserMovies();

    return me;
  };

  const register = async (userData) => {
    await authApi.register(userData);

    const me = await authApi.me();

    setUser(me.user);

    await loadUserMovies();

    return me;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      clearUserMovies();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
