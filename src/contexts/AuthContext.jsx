import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/backendApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await authApi.me();
        if (!cancelled) setUser(data.user);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
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
    const data = await authApi.login(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authApi.register(userData);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}