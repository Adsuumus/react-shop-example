import axios from "axios";
import { getAuthToken } from "../utils/auth";

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
});

http.interceptors.request.use((config) => {
  const token = getAuthToken();

  config.headers.apikey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";

  return config;
});
