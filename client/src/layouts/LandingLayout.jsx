import { Header } from "../components/Header.jsx";
import { Outlet, Navigate } from "react-router";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";

export function LandingLayout() {
  const { isAuthenticated } = useAuthenticationStore();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
