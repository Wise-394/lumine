import styles from "@styles/components/PostCard.module.css";
import { TerminalIcons } from "./TerminalIcons.jsx";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const LANG_MAP = {
  javascript: javascript(),
  js: javascript(),
};

export function PostCard({
  username,
  postTitle,
  postDescription = null,
  codeTitle,
  language,
  code = "",
  codeDescription,
  tags = [],
  createdAt,
}) {
  const initials = username.slice(0, 2);
  const langExtension = LANG_MAP[language?.toLowerCase()] ?? javascript();

  return (
    <article className={styles.postCard} data-testid="postCard">
      <header className={styles.postHeader}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.postMeta}>
          <span className={styles.username}>@{username ?? "guest"}</span>
          <span className={styles.time}>{createdAt}</span>
        </div>
        <button className={styles.moreBtn}>···</button>
      </header>

      <div className={styles.postTitle}>{postTitle}</div>
      {postDescription && (
        <div className={styles.postDescription}>{postDescription}</div>
      )}

      <div className={styles.terminalWrap}>
        <header className={styles.terminalHeader}>
          <TerminalIcons />
          <span className={styles.fileName}>{codeTitle}</span>
          <span className={styles.langBadge}>{language}</span>
        </header>

        <div className={styles.terminalBody}>
          <CodeMirror
            value={code}
            extensions={[langExtension]}
            theme={oneDark}
            editable={false}
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false,
              highlightActiveLine: false,
              highlightSelectionMatches: false,
            }}
          />
        </div>

        {codeDescription && (
          <footer className={styles.terminalFooter}>
            <p className={styles.codeDescription}>{codeDescription}</p>
            <span className={styles.terminalUser}>@{username}</span>
          </footer>
        )}
      </div>

      {tags.length > 0 && (
        <footer className={styles.postFooter}>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
