import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { Navigate } from "react-router";

export function Home() {
  const { isAuthenticated, isGuest } = useAuthenticationStore();
  const canAccess = isAuthenticated || isGuest;

  if (!canAccess) return <Navigate to="/landing-page" replace />;

  return <p>home</p>;
}
