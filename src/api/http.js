import axios from "axios";
import { getAuthToken } from "../utils/auth";

const config = {
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
  },
};

const addAuth = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
};

export const restHttp = addAuth(
  axios.create({
    baseURL: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
    ...config,
  }),
);

export const authHttp = addAuth(
  axios.create({
    baseURL: `${import.meta.env.VITE_SUPABASE_URL}/auth/v1`,
    ...config,
  }),
);
