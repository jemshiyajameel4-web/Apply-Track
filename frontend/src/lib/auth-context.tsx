"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { User } from "@/types";
import { authApi } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUserState: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initAuth = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem("applytrack_token");
      const storedUser = localStorage.getItem("applytrack_user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Verify token with backend
        try {
          const freshUser = await authApi.getMe();
          setUser(freshUser);
          localStorage.setItem("applytrack_user", JSON.stringify(freshUser));
        } catch {
          // If token expired, clear
          localStorage.removeItem("applytrack_token");
          localStorage.removeItem("applytrack_user");
          setToken(null);
          setUser(null);
        }
      }
    } catch {
      localStorage.removeItem("applytrack_token");
      localStorage.removeItem("applytrack_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await authApi.login(credentials);
    setToken(response.access_token);
    setUser(response.user);
    localStorage.setItem("applytrack_token", response.access_token);
    localStorage.setItem("applytrack_user", JSON.stringify(response.user));
  };

  const register = async (userData: {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    const response = await authApi.register(userData);
    setToken(response.access_token);
    setUser(response.user);
    localStorage.setItem("applytrack_token", response.access_token);
    localStorage.setItem("applytrack_user", JSON.stringify(response.user));
  };

  const logout = async () => {
    try {
      if (token) {
        await authApi.logout().catch(() => {});
      }
    } finally {
      localStorage.removeItem("applytrack_token");
      localStorage.removeItem("applytrack_user");
      setToken(null);
      setUser(null);
      window.location.href = "/login";
    }
  };

  const refreshUser = async () => {
    try {
      const freshUser = await authApi.getMe();
      setUser(freshUser);
      localStorage.setItem("applytrack_user", JSON.stringify(freshUser));
    } catch (e) {
      console.error("Failed to refresh user:", e);
    }
  };

  const updateUserState = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("applytrack_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        refreshUser,
        updateUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
