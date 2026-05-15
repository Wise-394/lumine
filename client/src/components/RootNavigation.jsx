import { Link } from "react-router";
import { AiFillHome } from "react-icons/ai";
import { FaCode } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import styles from "@styles/components/RootNavigation.module.css";
export function RootNavigation() {
  return (
    <nav className={styles.rootContainer}>
      <div className={styles.link}>
        <AiFillHome />
        <Link to="/">Home</Link>
      </div>
      <div className={styles.link}>
        <FaCode />
        <Link to="/code">Code</Link>
      </div>
      <div className={styles.link}>
        <CgProfile />
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}
