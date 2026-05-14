import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { Navigate, Link } from "react-router";
import { BsFillPlusCircleFill } from "react-icons/bs";
import styles from "@styles/pages/Home.module.css";

export function Home() {
  const { isAuthenticated, isGuest } = useAuthenticationStore();
  const canAccess = isAuthenticated || isGuest;

  if (!canAccess) return <Navigate to="/landing-page" replace />;

  return <main className={styles.container}>test</main>;
}
