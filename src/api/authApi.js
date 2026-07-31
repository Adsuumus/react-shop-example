import axios from "axios";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const authApi = axios.create({
  baseURL: `${supabaseUrl}/auth/v1`,
  headers: {
    apikey: supabaseAnonKey,
    "Content-Type": "application/json",
  },
});

export async function login(username, password) {
  const email = `${username}@user.local`;

  const response = await authApi.post("/token?grant_type=password", {
    email,
    password,
  });

  return response.data;
}

export async function register(name, password) {
  const email = `${name}@user.local`;

  const { data } = await axios.post(
    `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`,
    {
      email,
      password,
      data: {
        display_name: name,
      },
    },
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    },
  );

  return data;
}
