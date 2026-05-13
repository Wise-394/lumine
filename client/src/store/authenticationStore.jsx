import { create } from "zustand";
import { isLoggedIn, setJWT } from "../helpers/jwt.js";

export const useAuthenticationStore = create((set) => ({
  isAuthenticated: isLoggedIn(),

  login: (token) => {
    setJWT(token);
    set({ isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("JWT");
    set({ isAuthenticated: false });
  },
}));
