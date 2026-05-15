import styles from "@styles/pages/Error.module.css";
import { PiWarningOctagonFill } from "react-icons/pi";
import { useNavigate } from "react-router";

export function Error() {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <PiWarningOctagonFill className={styles.icon} />
      <p className={styles.code}>404</p>
      <h1>
        The page you're looking for <span>doesn't exist</span>
      </h1>
      <p className={styles.description}>
        It may have been moved, deleted, or you may have mistyped the URL.
      </p>
      <button className={styles.button} onClick={() => navigate("/")}>
        ← Go back home
      </button>
    </main>
  );
}
