import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { Navigate } from "react-router";

export function Home() {
  const { isAuthenticated } = useAuthenticationStore();
  if (!isAuthenticated) return <Navigate to="/landing-page" replace />;
  return <p>home</p>;
}
