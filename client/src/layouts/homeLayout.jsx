import { Outlet, Navigate } from "react-router";
import { Header } from "../components/Header.jsx";
import { HomeNavigation } from "../components/HomeNavigation.jsx";
import styles from "@styles/pages/HomeLayout.module.css";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
export function HomeLayout() {
  const { isAuthenticated, isGuest } = useAuthenticationStore();
  const canAccess = isAuthenticated || isGuest;

  if (!canAccess) return <Navigate to="/landing-page" replace />;
  return (
    <>
      <Header />
      <div className={styles.container}>
        <HomeNavigation />
        <Outlet />
      </div>
    </>
  );
}

// TODO AUTHENTICATED - redirect to "/
// NOT AUTHENTICATED - redirect to "/landing-page if accesing "/" and childrens
//TODO IMPROVE THE CODE READABILITY, put the redirects into helper function
