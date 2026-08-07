import { authHttp } from "./http";

async function changePassword(password) {
  const { data } = await authHttp.put("/user", {
    password,
  });

  return data;
}

async function getUserProfile() {
  return authHttp.get("/user");
}

export { getUserProfile, changePassword };
