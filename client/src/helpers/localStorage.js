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
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const isLoggedIn = () => {
  const token = getJWT();
  const valid = isTokenValid(token);
  if (!valid) localStorage.removeItem("JWT");
  return valid;
};

//guest
export function setGuest(isGuest) {
  return localStorage.setItem("guest", isGuest);
}

export function getGuest() {
  return localStorage.getItem("guest");
}
