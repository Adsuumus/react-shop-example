import { clearAuth } from "../utils/auth";

export const handleAuthError = (error) => {
  if (error.response?.status === 401) {
    clearAuth();
    window.location.href = "${import.meta.env.BASE_URL}/login";
  }

  return Promise.reject(error);
};
