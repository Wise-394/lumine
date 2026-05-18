export function setJWT(token) {
  localStorage.setItem("JWT", token);
}

export function getJWT() {
  return localStorage.getItem("JWT");
}

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    if (!payload.exp) return false;

    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const decodeToken = (token) => {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

export const getValidPayload = () => {
  const token = getJWT();
  if (!isTokenValid(token)) {
    localStorage.removeItem("JWT");
    return null;
  }
  return decodeToken(token);
};

export function setGuest(isGuest) {
  localStorage.setItem("guest", isGuest);
}

export function getGuest() {
  return localStorage.getItem("guest");
}
