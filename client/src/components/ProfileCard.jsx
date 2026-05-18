import styles from "@styles/components/ProfileCard.module.css";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";

export function ProfileCard() {
  const { user } = useAuthenticationStore();
  return (
    <div className={styles.profileCard}>
      <h1> {user?.username ? `@${user.username}` : "@guest"}</h1>
      <div className={styles.info}>
        <p>10 post</p>
        <p>0 followers</p>
        <p>10 following</p>
      </div>
    </div>
  );
}
