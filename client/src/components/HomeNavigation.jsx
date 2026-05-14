import { Link } from "react-router";
import { AiFillHome } from "react-icons/ai";
import { FaCode } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import styles from "@styles/components/HomeNavigation.module.css";
export function HomeNavigation() {
  return (
    <nav className={styles.container}>
      <div className={styles.link}>
        <AiFillHome />
        <Link to="/">Home</Link>
      </div>
      <div className={styles.link}>
        <FaCode />
        <Link to="/">Code</Link>
      </div>
      <div className={styles.link}>
        <CgProfile />
        <Link to="/">Profile</Link>
      </div>
    </nav>
  );
}
