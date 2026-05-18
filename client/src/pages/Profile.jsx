import styles from "@styles/pages/Profile.module.css";
import { ProfileCard } from "../components/ProfileCard.jsx";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { GuestProfile } from "../components/GuestProfile.jsx";
export function Profile() {
  const { user } = useAuthenticationStore();

  if (!user) {
    return <GuestProfile />;
  }
  return (
    <main className={styles.profileContainer}>
      <ProfileCard />
    </main>
  );
}
