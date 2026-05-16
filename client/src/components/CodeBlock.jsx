import { useState } from "react";
import styles from "@styles/components/CodeBlock.module.css";
import { TerminalIcons } from "./TerminalIcons.jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const theme = Object.fromEntries(
  Object.entries(oneDark).map(([k, v]) => [
    k,
    { ...v, background: "transparent" },
  ]),
);

const PADDING = "1.25rem 1.5rem 1.25rem 1rem";
const FONT_SIZE = "0.9rem";
const LINE_HEIGHT = "1.7";
const FONT_FAMILY = "var(--font-code)";

export function CodeBlock() {
  const [code, setCode] = useState("");

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
            <div className={styles.editorWrapper}>
              <SyntaxHighlighter
                language="javascript"
                style={theme}
                wrapLongLines={false}
                customStyle={{
                  margin: 0,
                  padding: PADDING,
                  background: "transparent",
                  fontSize: FONT_SIZE,
                  fontFamily: FONT_FAMILY,
                  lineHeight: LINE_HEIGHT,
                  whiteSpace: "pre",
                  wordBreak: "normal",
                  overflowX: "visible",
                  overflowY: "visible",
                  minHeight: "100%",
                  width: "100%",
                  boxSizing: "border-box",
                  borderRadius: 0,
                }}
                codeTagProps={{
                  style: {
                    padding: 0,
                    background: "transparent",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                  },
                }}
              >
                {code + " "}
              </SyntaxHighlighter>

              <textarea
                className={styles.codeArea}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// start typing your code here…"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
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
