import styles from "@styles/components/CodeBlock.module.css";
import { TerminalIcons } from "./TerminalIcons.jsx";

export function CodeBlock() {
  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminal}>
        {/* Header */}
        <div className={styles.header}>
          <TerminalIcons />
          <input
            type="text"
            className={styles.fileNameInput}
            placeholder="helloWorld.js"
            spellCheck={false}
          />
          <div className={styles.headerRight}>
            <span className={styles.langBadge}>lumine</span>
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.editorCol}>
            <textarea
              className={styles.codeArea}
              placeholder="// start typing your code here…"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <textarea
            className={styles.descriptionInput}
            placeholder="Add a description — what does this code do?"
            rows={2}
          />
          <div className={styles.footerMeta}>
            <div className={styles.metaInfo}>
              <span className={styles.infoPill}>@user</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
