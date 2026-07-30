import { setUserName, setAuthToken, clearAuth } from "../../utils/auth";
import { login } from "../../api/authApi";

async function signIn(username, password) {
  try {
    const data = await login(username, password);
    const token = data.access_token;

    const displayName = data.user.user_metadata.display_name;

    console.log(displayName);

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

export { signIn, signOut };
