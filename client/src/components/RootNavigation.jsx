import { NavLink } from "react-router";
import { AiFillHome } from "react-icons/ai";
import { FaCode } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import styles from "@styles/components/RootNavigation.module.css";

export function RootNavigation() {
  return (
    <nav className={styles.rootContainer}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
      >
        <AiFillHome />
        Home
      </NavLink>
      <NavLink
        to="/code"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
      >
        <FaCode />
        Code
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
      >
        <CgProfile />
        Profile
      </NavLink>
    </nav>
  );
}
