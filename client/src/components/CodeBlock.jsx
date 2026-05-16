import styles from "@styles/components/CodeBlock.module.css";

export function CodeBlock() {
  return (
    <div className={styles.terminalWrapper}>
      <div className={styles.terminalContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <input
            type="text"
            className={styles.fileNameInput}
            placeholder="helloWorld.js"
            spellCheck={false}
          />
          <div className={styles.headerRight}>
            <span className={styles.langBadge}>code</span>
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
            <div className={styles.metaStats}>
              <span className={styles.statPill}>0 chars</span>
              <span className={styles.statPill}>0 words</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
