import styles from "@styles/pages/newPost.module.css";
import { NewPostForm } from "../components/NewPostForm.jsx";
import { FiSend } from "react-icons/fi";
// import { CodeBlock } from "../components/CodeBlock.jsx";
export function NewPost() {
  return (
    <main className={styles.newPostContainer}>
      <div className={styles.header}>
        <h1>
          <span className="highlight">New Post </span>
        </h1>
        <button type="button">
          Post <FiSend />
        </button>
      </div>
      <div className={styles.body}>
        <NewPostForm />
      </div>
    </main>
  );
}
