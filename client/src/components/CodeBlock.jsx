import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import styles from "@styles/components/CodeBlock.module.css";
import { TerminalIcons } from "./TerminalIcons.jsx";
import { tokyoNight } from "@uiw/codemirror-themes-all";

export function CodeBlock() {
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");

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
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            spellCheck={false}
          />
          <div className={styles.headerRight}>
            <span className={styles.langBadge}>lumine</span>
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.editorCol}>
            <CodeMirror
              value={code}
              onChange={setCode}
              extensions={[javascript(), tokyoNight]}
              placeholder="// start typing your code here…"
              basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
                autocompletion: false,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                syntaxHighlighting: true,
                searchKeymap: false,
                tabSize: 2,
              }}
              className={styles.codeMirror}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <textarea
            className={styles.descriptionInput}
            placeholder="Add a description — what does this code do?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
