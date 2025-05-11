"use client"

import React, { useState, useEffect, ReactNode } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import AuthServices from "@/services/auth/auth.service";
import AuthContext from "@/contexts/AuthContext";

const { processRefreshToken } = AuthServices;

interface ExtendedJwtPayload extends JwtPayload {
  // Add any custom fields your JWT may contain
  name?: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  user: ExtendedJwtPayload | null;
  setUser: (user: ExtendedJwtPayload | null) => void;
  login: (tokens: { accessToken: string }) => void;
  isAuthenticated: boolean;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<ExtendedJwtPayload | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const decoded = jwtDecode<ExtendedJwtPayload>(accessToken);
          if (decoded.exp && decoded.exp * 1000 > Date.now()) {
            setUser(decoded);
            setIsAuthenticated(true);
          } else {
            await refreshToken();
          }
        } catch {
          await refreshToken();
        }
      } else {
        await refreshToken();
      }
    })();
  }, []);

  const login = ({ accessToken }: { accessToken: string }) => {
    localStorage.setItem("accessToken", accessToken);
    const data = jwtDecode<ExtendedJwtPayload>(accessToken);
    setUser(data);
    setIsAuthenticated(true);
  };

  const refreshToken = async () => {
    try {
      const res = await processRefreshToken();
      const { accessToken } = res;
      localStorage.setItem("accessToken", accessToken);
      const decoded = jwtDecode<ExtendedJwtPayload>(accessToken);
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Refresh token failed:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    setUser,
    login,
    isAuthenticated,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, isAuthenticated, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
