import { authHttp } from "./http";

async function changePassword(password) {
  const { data } = await authHttp.put("/user", {
    password,
  });

  return data;
}

export { changePassword };
