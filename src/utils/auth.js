export function getAuthToken() {
  return localStorage.getItem("token") || null;
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

export function setID(ID) {
  localStorage.setItem("ID", ID);
}

export function getID() {
  return localStorage.getItem("ID") || null;
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("ID");
}
