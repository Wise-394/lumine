import { Outlet } from "react-router";
import { Header } from "../components/Header.jsx";
import { RootNavigation } from "../components/RootNavigation.jsx";
import styles from "@styles/pages/RootLayout.module.css";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { redirectIfNotAuthenticated } from "../helpers/redirect.jsx";
export function RootLayout() {
  const { isLoggedIn, isGuest } = useAuthenticationStore();
  const redirect = redirectIfNotAuthenticated(isLoggedIn, isGuest);
  if (redirect) return redirect;

  return (
    <>
      <Header />
      <div className={styles.rootLayoutcontainer}>
        <RootNavigation />
        <Outlet />
      </div>
    </>
  );
}
