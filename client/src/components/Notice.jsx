import styles from "@styles/components/Notice.module.css";

export function Notice() {
  return (
    <div className={styles.noticeCard}>
      <header className={styles.noticeHeader}>
        <div className={styles.iconDot} aria-hidden="true" />
        <span className={styles.noticeLabel}>notice</span>
      </header>
      <p className={styles.noticeTitle}>Lumine is actively being developed.</p>
      <p className={styles.noticeBody}>
        Core features are live and new ones are shipping regularly.
      </p>
    </div>
  );
}
