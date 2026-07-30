import axios from "axios";
import { getAuthToken } from "../utils/auth";
// import { handleUnauthorized } from "../unauthorized";

const baseURL = import.meta.env.VITE_API_URL ?? "";

export const http = axios.create({ baseURL });

http.interceptors.request.use((cfg) => {
  const token = getAuthToken();
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});
