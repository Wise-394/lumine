import { create } from "zustand";
import {
  isLoggedIn,
  setJWT,
  setGuest,
  getGuest,
} from "../helpers/localStorage.js";

export const useAuthenticationStore = create((set) => ({
  isLoggedIn: isLoggedIn(),
  isGuest: getGuest() === "true",

  login: (token) => {
    setJWT(token);
    set({ isLoggedIn: true, isGuest: false });
  },

  logout: () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("guest");
    set({ isLoggedIn: false });
  },

  loginGuest: () => {
    setGuest("true");
    set({ isGuest: true });
  },
  logoutGuest: () => {
    localStorage.removeItem("guest");
    set({ isGuest: false });
  },
}));
