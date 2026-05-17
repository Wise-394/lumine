import { create } from "zustand";
import {
  setJWT,
  decodeToken,
  getValidPayload,
  setGuest,
  getGuest,
} from "../helpers/localStorage.js";

const existingPayload = getValidPayload();

export const useAuthenticationStore = create((set) => ({
  isLoggedIn: !!existingPayload,
  isGuest: getGuest() === "true",
  user: existingPayload,
  userId: existingPayload?.sub ?? null,

  login: (token) => {
    setJWT(token);
    const payload = decodeToken(token);
    set({
      isLoggedIn: true,
      isGuest: false,
      user: payload,
    });
  },

  logout: () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("guest");
    set({ isLoggedIn: false, isGuest: false, user: null, userId: null });
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
