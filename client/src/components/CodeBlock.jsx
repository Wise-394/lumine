import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import styles from "@styles/components/CodeBlock.module.css";
import { TerminalIcons } from "./TerminalIcons.jsx";
import { tokyoNight } from "@uiw/codemirror-themes-all";
import { useNewPostStore } from "../store/newPostStore.jsx";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
export function CodeBlock() {
  const { code, language, codeBlockTitle, codeBlockDescription, updateField } =
    useNewPostStore();
  const { user } = useAuthenticationStore();

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
            value={codeBlockTitle}
            onChange={(e) => updateField("codeBlockTitle", e.target.value)}
            spellCheck={false}
          />
          <div className={styles.headerRight}>
            <input
              type="text"
              className={styles.languageInput}
              placeholder="Javascript"
              value={language}
              onChange={(e) => updateField("language", e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.editorCol}>
            <CodeMirror
              value={code}
              onChange={(value) => updateField("code", value)}
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
            value={codeBlockDescription}
            onChange={(e) =>
              updateField("codeBlockDescription", e.target.value)
            }
            rows={2}
          />
          <div className={styles.footerMeta}>
            <div className={styles.metaInfo}>
              <span className={styles.infoPill}>
                {user?.username ? `@${user.username}` : "@guest"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
