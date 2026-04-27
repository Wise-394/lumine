import styles from "@styles/components/Header.module.css";
import { FiMenu } from "react-icons/fi";
export function Header() {
  return (
    <header className={styles.container}>
      <p className={styles.logo}>lumine</p>
      <nav>
        <a className={styles.link}>Login</a>
        <a className={styles.link}>Create Account</a>
        <a className={styles.link}>Paste Code</a>
        <FiMenu className={styles.hamburger} />
      </nav>
    </header>
  );
}
