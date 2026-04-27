import styles from "@styles/Hero.module.css";

export function Hero() {
  return (
    <section className={styles.grid}>
      <div>
        <div className={styles.leftContainer}>
          <h1>Share Code Snippets</h1>
          <h2>Copy and Paste is Not Enough, Make It Look Good!</h2>
          <p>
            lumine is built for developers who want to share code snippet that
            looks good and not just paste it to send somewhere. Code snippets
            can be posted publicly or exported as styled image.
          </p>
          <div className={styles.buttons}>
            <a className={styles.cta}>Browse Snippets</a>
            <a>Paste Code</a>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}
