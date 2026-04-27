import { useState } from "react";
import styles from "@styles/Header.module.css";
import { FiMenu, FiX } from "react-icons/fi";

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={styles.container}>
      <p className={styles.logo}>lumine</p>

      <nav className={`${styles.nav} ${isSidebarOpen ? styles.active : ""}`}>
        {isSidebarOpen && (
          <FiX className={styles.closeIcon} onClick={toggleSidebar} />
        )}
        <a className={styles.link}>Login</a>
        <a className={styles.link}>Create Account</a>
        <a className={styles.link}>Paste Code</a>
      </nav>

      <FiMenu className={styles.hamburger} onClick={toggleSidebar} />

      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
    </header>
  );
}
