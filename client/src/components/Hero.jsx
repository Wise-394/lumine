import styles from "@styles/Hero.module.css";
import { FiArrowRight } from "react-icons/fi";
import { HeroTerminal } from "./HeroTerminal.jsx";
export function Hero() {
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
          <a className={styles.cta}>Browse Snippets</a>
          <a>
            Paste Code <FiArrowRight />
          </a>
        </div>
      </div>
      <HeroTerminal />
    </section>
  );
}
