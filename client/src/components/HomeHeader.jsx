import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { useNavigate } from "react-router";
import styles from "@styles/components/HomeHeader.module.css";
export function HomeHeader() {
  const { logout } = useAuthenticationStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <header className={styles.container}>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
