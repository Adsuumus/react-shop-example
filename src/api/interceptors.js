import { clearAuth } from "@/utils/auth";

export const handleAuthError = (error) => {
  if (
    error.response?.status === 401 &&
    window.location.pathname.startsWith("/profile")
  ) {
    clearAuth();
    window.location.href = `${import.meta.env.BASE_URL}login/`;
  }

  return Promise.reject(error);
};
