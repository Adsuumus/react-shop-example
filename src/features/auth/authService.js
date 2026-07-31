import { setUserName, setAuthToken, clearAuth } from "../../utils/auth";
import { login, register } from "../../api/authApi";

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

    return {
      ok: false,
      error: "Не удалось получить токен",
    };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.msg || "Ошибка регистрации",
    };
  }
}

async function signIn(username, password) {
  try {
    const data = await login(username, password);
    const token = data.access_token;

    const displayName = data.user.user_metadata.display_name;

    setAuthToken(token);
    setUserName(displayName);

    return { ok: true, user: data.user, token, username: displayName };
  } catch (error) {
    const message = error.response?.data?.message || "Ошибка авторизации";
    return { ok: false, error: message };
  }
}

function signOut() {
  clearAuth();
}

export { signUp, signIn, signOut };
