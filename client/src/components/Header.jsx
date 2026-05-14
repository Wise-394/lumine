import { useState } from "react";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { useNavigate, Link } from "react-router";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import styles from "@styles/components/Header.module.css";

export function Header() {
  const { isAuthenticated, logout } = useAuthenticationStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Authenticated
  if (isAuthenticated) {
    return (
      <header className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">Lumine</Link>
        </div>
        <button onClick={handleLogout} className={styles.logout}>
          <FiLogOut /> Logout
        </button>
      </header>
    );
  }

  // Guest
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">lumine</Link>
      </div>

      <nav className={`${styles.nav} ${isSidebarOpen ? styles.active : ""}`}>
        {isSidebarOpen && (
          <FiX className={styles.closeIcon} onClick={toggleSidebar} />
        )}
        <Link to="/login" className={styles.link}>
          Login
        </Link>
        <Link to="/register" className={styles.link}>
          Create Account
        </Link>
        <a className={`${styles.link} ${styles.cta}`}>Try Lumine</a>
      </nav>

      {!isSidebarOpen && (
        <FiMenu className={styles.hamburger} onClick={toggleSidebar} />
      )}

      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}
    </header>
  );
}
