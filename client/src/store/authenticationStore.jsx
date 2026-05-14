import { create } from "zustand";
import { isLoggedIn, setJWT } from "../helpers/jwt.js";

export const useAuthenticationStore = create((set) => ({
  isAuthenticated: isLoggedIn(),
  isGuest: false,

  login: (token) => {
    setJWT(token);
    set({ isAuthenticated: true, isGuest: false });
  },

  logout: () => {
    localStorage.removeItem("JWT");
    set({ isAuthenticated: false });
  },

  loginGuest: () => {
    set({ isGuest: true });
  },
  logoutGuest: () => {
    set({ isGuest: false });
  },
}));
