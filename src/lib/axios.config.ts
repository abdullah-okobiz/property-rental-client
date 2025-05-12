"use client"
import axios from "axios";

import { apiBaseUrl } from "@/config/config";
import useAuth from "@/hooks/useAuth";

// const { logout } = useAuth();

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request interceptor to add the access token to the headers
axiosClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh logic
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 403 error for token expiration and avoid infinite refresh loop
    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosClient.post("/refresh");  // Refresh token API
        const newAccessToken = res?.data?.accessToken;

        if (newAccessToken) {
          // Save new token and retry original request
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        // In case refresh fails, logout the user
        // logout();
        return Promise.reject(refreshError);
      }
    }

    // Reject other errors
    return Promise.reject(error);
  }
);

export default axiosClient;

