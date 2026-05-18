import styles from "@styles/pages/Profile.module.css";
import { ProfileCard } from "../components/ProfileCard.jsx";

export function Profile() {
  return (
    <main className={styles.profileContainer}>
      <ProfileCard />
    </main>
  );
}
