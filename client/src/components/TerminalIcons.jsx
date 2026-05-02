import styles from "@styles/components/TerminalIcons.module.css";
export function TerminalIcons() {
  return (
    <div className={styles.terminalIcons}>
      <span className={styles.iconRed} />
      <span className={styles.iconYellow} />
      <span className={styles.iconGreen} />
    </div>
  );
}
