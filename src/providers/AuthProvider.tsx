"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import AuthServices from "@/services/auth/auth.service";
import AuthContext from "@/contexts/AuthContext";

const { processRefreshToken } = AuthServices;

interface ExtendedJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  user: ExtendedJwtPayload | null;
  setUser: (user: ExtendedJwtPayload | null) => void;
  login: (tokens: { accessToken: string })=> void;
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
    const checkToken = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const decoded = jwtDecode<ExtendedJwtPayload>(accessToken);
          const isExpired = decoded.exp && decoded.exp * 1000 < Date.now();

          if (isExpired) {
            await refreshToken();
          } else {
            setUser(decoded);
            setIsAuthenticated(true);
          }
        } catch {
          await refreshToken();
        }
      } else {
        await refreshToken(); 
      }
    };

    checkToken();
  }, []);


  const login = ({ accessToken }: { accessToken: string }) => {
    localStorage.setItem("accessToken", accessToken);
    const decoded = jwtDecode<ExtendedJwtPayload>(accessToken);
    setUser(decoded);
    setIsAuthenticated(true);
  };

  const refreshToken = async () => {
    try {
      const res = await processRefreshToken();
      const { accessToken }:any = res;
      localStorage.setItem("accessToken", accessToken);
      const decoded = jwtDecode<ExtendedJwtPayload>(accessToken);
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Refresh token failed:", error);
      logout();
    }
  };

  // Logout
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
console.log("value ===== ",value)
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
