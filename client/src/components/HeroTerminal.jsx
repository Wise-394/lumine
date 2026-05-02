import styles from "@styles/components/HeroTerminal.module.css";
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { TerminalIcons } from "./TerminalIcons.jsx";
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
          <TerminalIcons />
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
                <SyntaxHighlighter
                  language="javascript"
                  style={atomOneDark}
                  wrapLines={true}
                  wrapLongLines={true}
                  PreTag="div"
                  customStyle={{
                    background: "transparent",
                    padding: 0,
                    margin: 0,
                    fontSize: "1rem",
                    lineHeight: "18px",
                  }}
                  useInlineStyles={true}
                >
                  {line || " "}
                </SyntaxHighlighter>
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
