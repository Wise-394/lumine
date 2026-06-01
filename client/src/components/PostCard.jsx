import { useState, useRef, useEffect } from "react";
import styles from "@styles/components/PostCard.module.css";
import { TerminalIcons } from "./TerminalIcons.jsx";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { apiFetch } from "../helpers/api.js";
import { getJWT } from "../helpers/localStorage.js";
import { useNavigate } from "react-router";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const LANG_MAP = {
  javascript: javascript(),
  js: javascript(),
};

export function PostCard({
  username,
  postTitle,
  postUserId,
  postDescription = null,
  codeTitle,
  language,
  code = "",
  codeDescription,
  tags = [],
  createdAt,
  setPosts,
  postId,
  likesCount,
  likedByUser,
}) {
  const navigate = useNavigate();
  const { userId } = useAuthenticationStore();
  const initials = (username ?? "Guest").slice(0, 2);
  const langExtension = LANG_MAP[language?.toLowerCase()] ?? javascript();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [count, setCount] = useState(likesCount);

  const handleLike = async () => {
    try {
      const token = getJWT();
      const res = await apiFetch(`/posts/${postId}/likes`, {
        method: isLiked ? "DELETE" : "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLiked(!isLiked);
      setCount(res.likes);
    } catch (err) {
      console.error("unable to like", err);
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleDeletePost = async () => {
    try {
      const token = getJWT();
      await apiFetch(`/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p.postId !== postId));
      setMenuOpen(false);
    } catch (err) {
      console.error("unable to delete post", err);
    }
  };

  const redirectToPostDetail = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <article className={styles.postCard} data-testid="postCard">
      <header className={styles.postHeader}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.postMeta}>
          <span className={styles.username}>@{username ?? "guest"}</span>
          <span className={styles.time}>{createdAt}</span>
        </div>

        {userId && postUserId && userId === postUserId && (
          <div className={styles.moreMenu} ref={menuRef}>
            <button
              className={styles.moreBtn}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="More options"
            >
              ···
            </button>

            {menuOpen && (
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownItem}
                  onClick={redirectToPostDetail}
                >
                  <span className={styles.dropdownIcon}>✎</span> Edit
                </button>
                <button
                  className={`${styles.dropdownItem} ${styles.dropdownItemDelete}`}
                  onClick={handleDeletePost}
                >
                  <span className={styles.dropdownIcon}>⌫</span> Delete
                </button>
              </div>
            )}
          </div>
        )}
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

        <footer className={styles.terminalFooter}>
          {codeDescription && (
            <p className={styles.codeDescription}>{codeDescription}</p>
          )}
          <div>
            <button
              onClick={handleLike}
              className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <p>{count}</p>
          </div>
        </footer>
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
// TODO popup preventing guest to like
// TODO like functionality
