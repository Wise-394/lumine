import { Outlet } from "react-router";
import { Header } from "../components/Header.jsx";
import { HomeNavigation } from "../components/HomeNavigation.jsx";
import styles from "@styles/pages/HomeLayout.module.css";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { redirectIfNotAuthenticated } from "../helpers/redirect.jsx";
export function HomeLayout() {
  const { isLoggedIn, isGuest } = useAuthenticationStore();
  const redirect = redirectIfNotAuthenticated(isLoggedIn, isGuest);
  if (redirect) return redirect;

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
