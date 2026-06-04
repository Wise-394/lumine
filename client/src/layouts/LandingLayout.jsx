import { Header } from "../components/Header.jsx";
import { Outlet } from "react-router";
import { redirectIfAuthenticated } from "../helpers/redirect.jsx";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
export function LandingLayout() {
  const isLoggedIn = useAuthenticationStore((state) => state.loggedIn);
  const isGuest = useAuthenticationStore((state) => state.isGuest);
  const redirect = redirectIfAuthenticated(isLoggedIn, isGuest);
  if (redirect) return redirect;
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
