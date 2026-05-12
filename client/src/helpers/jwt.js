export function setJWT(token) {
  localStorage.setItem("JWT", token);
}

export function getJWT() {
  return localStorage.getItem("JWT");
}

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const isExpired = payload.exp * 1000 < Date.now();
    return !isExpired;
  } catch {
    return false;
  }
};

export const isLoggedIn = () => {
  const token = getJWT();
  return isTokenValid(token);
};
