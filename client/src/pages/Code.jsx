import styles from "@styles/pages/Code.module.css";
import { NewPost } from "../components/NewPost.jsx";
import { FiSend } from "react-icons/fi";
// import { CodeBlock } from "../components/CodeBlock.jsx";
export function Code() {
  return (
    <main className={styles.postContainer}>
      <div className={styles.postHeader}>
        <h1>
          <span className="highlight">New Post </span>
        </h1>
        <button type="button">
          Post <FiSend />
        </button>
      </div>
      <div className={styles.codeContainer}>
        <NewPost />
      </div>
    </main>
  );
}
