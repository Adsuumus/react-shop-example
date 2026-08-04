import { setUserName, setAuthToken, setID, clearAuth } from "../../utils/auth";
import { login, register } from "../../api/authApi";
import { apiError } from "../../api/apiError";

async function signUp(username, password) {
  try {
    const data = await register(username, password);

    if (data.access_token) {
      setAuthToken(data.access_token);
      setUserName(username);

      return {
        ok: true,
        token: data.access_token,
        username,
        user: data.user,
      };
    }

    throw new Error("Не удалось получить токен");
  } catch (error) {
    throw apiError(error);
  }
}

async function signIn(username, password) {
  try {
    const data = await login(username, password);

    const token = data.access_token;
    const displayName = data.user.user_metadata.display_name;

    setAuthToken(token);
    setUserName(displayName);
    setID(data.user.id);

    return {
      ok: true,
      user: data.user,
      token,
      username: displayName,
    };
  } catch (error) {
    throw apiError(error);
  }
}

function signOut() {
  clearAuth();
}

export { signUp, signIn, signOut };
