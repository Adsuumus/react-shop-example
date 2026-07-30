export function getAuthToken() {
  const raw = localStorage.getItem("token");
  return raw || null;
}

export function setAuthToken(token) {
  localStorage.setItem("token", token);
}

export function getUserName() {
  return localStorage.getItem("userName") || null;
}

export function setUserName(name) {
  localStorage.setItem("userName", name);
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
}
