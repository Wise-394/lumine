import styles from "@styles/components/GuestProfile.module.css";
import { PiWarningOctagonFill } from "react-icons/pi";
import { useNavigate } from "react-router";

export function GuestProfile() {
  const navigate = useNavigate();
  return (
    <main className={styles.guestContainer}>
      <PiWarningOctagonFill className={styles.icon} />
      <p className={styles.code}>GUEST</p>
      <h1>
        <span>You're not logged in</span>
      </h1>
      <p className={styles.description}>
        You need an account to view this page. Please sign in or create an
        account to continue.
      </p>
      <button className={styles.button} onClick={() => navigate("/")}>
        ← Go back home
      </button>
    </main>
  );
}
