import { Navigate } from "react-router";

export function redirectIfAuthenticated(isLoggedIn, isGuest) {
  const isAuthenticated = isLoggedIn || isGuest;
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return null;
}

export function redirectIfNotAuthenticated(isLoggedIn, isGuest) {
  const isAuthenticated = isLoggedIn || isGuest;
  if (!isAuthenticated) {
    return <Navigate to="/landing-page" replace />;
  }
  return null;
}
