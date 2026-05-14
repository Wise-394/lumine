import { Outlet } from "react-router";
import { Header } from "../components/Header.jsx";
import { HomeNavigation } from "../components/HomeNavigation.jsx";
import styles from "@styles/pages/HomeLayout.module.css";
export function HomeLayout() {
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
