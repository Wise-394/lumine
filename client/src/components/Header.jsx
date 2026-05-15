import { useState } from "react";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { useNavigate, Link } from "react-router";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import styles from "@styles/components/Header.module.css";

export function Header() {
  const { isLoggedIn, loginGuest, logout, isGuest, logoutGuest } =
    useAuthenticationStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleExitGuest = () => {
    logoutGuest();
    navigate("/");
  };

  const handleGuest = () => {
    loginGuest();
    navigate("/");
  };

  // Authenticated
  if (isLoggedIn || isGuest) {
    return (
      <header className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">Lumine</Link>
        </div>
        {isLoggedIn && (
          <button onClick={handleLogout} className={styles.logout}>
            <FiLogOut /> Logout
          </button>
        )}
        {isGuest && (
          <button onClick={handleExitGuest} className={styles.logout}>
            <FiLogOut /> Exit
          </button>
        )}
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
        <a className={`${styles.link} ${styles.cta}`} onClick={handleGuest}>
          Try Lumine
        </a>
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
