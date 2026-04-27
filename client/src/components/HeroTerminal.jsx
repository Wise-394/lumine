import styles from "@styles/HeroTerminal.module.css";
import { FiHeart, FiMessageSquare } from "react-icons/fi";

export function HeroTerminal() {
  const jsCode = [
    "const checkNumber = (num) => {",
    "  const status = num % 2 === 0 ? 'even' : 'odd';",
    "  return `The number ${num} is ${status}.`;",
    "};",
    "",
    "const sequence = [7, 14, 21, 28];",
    "const results = sequence.map(checkNumber);",
  ];

  return (
    <div className={styles.exportWrapper}>
      <section className={styles.terminal}>
        <header className={styles.terminalHeader}>
          <div className={styles.terminalIcons}>
            <span className={styles.iconRed} />
            <span className={styles.iconYellow} />
            <span className={styles.iconGreen} />
          </div>
          <div className={styles.fileName}>
            <span>oddOrEven.js</span>
          </div>
          <div className={styles.langBadge}>javascript</div>
        </header>

        <div className={styles.terminalBody}>
          {jsCode.map((line, i) => (
            <div key={i} className={styles.codeRow}>
              <div className={styles.gutter}>
                <span className={styles.lineNumber}>{i + 1}</span>
              </div>
              <div className={styles.codeWrapper}>
                <code className={styles.codeContent}>{line || "\u00A0"}</code>
              </div>
            </div>
          ))}
        </div>

        <footer className={styles.terminalFooter}>
          <p className={styles.description}>
            A concise way to <strong>map over sequences</strong> and determine
            parity using the modulo operator.
          </p>

          <div className={styles.engagementBar}>
            <div className={styles.userInfo}>
              <span className={styles.userTag}>@wise-394</span>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <FiHeart size={14} />
                <span>325</span>
              </div>
              <div className={styles.statItem}>
                <FiMessageSquare size={14} />
                <span>12</span>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
