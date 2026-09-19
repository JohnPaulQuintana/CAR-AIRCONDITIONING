import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  clearAuthSession,
  getAccessToken,
  setAccessToken,
} from "../features/auth/auth.storage";

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as RetryableRequestConfig | undefined;

    // Not a 401 or request cannot be retried
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      if (error.response?.status === 401) {
        clearAuthSession();
        window.location.href = "/";
      }

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Get a new access token using the HttpOnly refresh token cookie.
      const response = await axios.post<{
        access_token: string;
        token_type: string;
      }>(
        `${API_URL}/auth/refresh`,
        {},
        {
          withCredentials: true,
        },
      );

      const newAccessToken = response.data.access_token;

      // Save the new access token.
      setAccessToken(newAccessToken);

      // Retry the original request with the new token.
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh token is also invalid/expired.
      clearAuthSession();

      window.location.href = "/";

      return Promise.reject(refreshError);
    }
  },
);