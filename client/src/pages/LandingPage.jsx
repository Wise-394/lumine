import { Hero } from "../components/Hero.jsx";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { Navigate } from "react-router";
export function LandingPage() {
  const { isAuthenticated, isGuest } = useAuthenticationStore();
  const canAccess = isAuthenticated || isGuest;
  if (canAccess) return <Navigate to="/" replace />;
  return (
    <>
      <Hero />
    </>
  );
}
