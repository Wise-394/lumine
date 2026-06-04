import styles from "@styles/components/Hero.module.css";
import { FiArrowRight } from "react-icons/fi";
import { HeroTerminal } from "./HeroTerminal.jsx";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
export function Hero() {
  const { loginGuest } = useAuthenticationStore();
  const handleNavigate = () => {
    loginGuest();
  };
  return (
    <section className={styles.grid}>
      <div className={styles.leftContainer}>
        <h1>Share Code Snippets</h1>
        <h2>Copy and Paste is Not Enough, Make It Look Good!</h2>
        <p>
          Lumine is built for developers who want to share code snippets that
          look professional. In lumine, You can post code snippets publicly or
          export as high-quality styled images.
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.cta}
            onClick={() => handleNavigate("/home")}
          >
            Browse Snippets
          </button>
          <button onClick={() => handleNavigate("/post")}>
            Paste Code <FiArrowRight />
          </button>
        </div>
      </div>
      <HeroTerminal />
    </section>
  );
}

//TODO improve landing page
// TODO ESCAPE DIALOG
