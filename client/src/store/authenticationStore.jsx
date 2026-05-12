import { create } from "zustand";
import { isLoggedIn } from "../helpers/jwt.js";
import { setJWT } from "../helpers/jwt.js";

export const useAuthenticationStore = create((set) => ({
  isAuthenticated: false,

  initAuth: () => {
    const valid = isLoggedIn();
    if (!valid) localStorage.removeItem("JWT");
    set({ isAuthenticated: valid });
  },

  login: (token) => {
    setJWT(token);
    set({ isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("JWT");
    set({ isAuthenticated: false });
  },
}));
