import styles from "@styles/pages/newPost.module.css";
import { NewPostForm } from "../components/NewPostForm.jsx";
import { LuSendHorizontal } from "react-icons/lu";
import { CodeBlock } from "../components/CodeBlock.jsx";
// import { CodeBlock } from "../components/CodeBlock.jsx";
export function NewPost() {
  return (
    <main className={styles.newPostContainer}>
      <div className={styles.header}>
        <h1>
          <span className="highlight">New Post </span>
        </h1>
        <button type="button">
          <LuSendHorizontal /> Post
        </button>
      </div>
      <div className={styles.body}>
        <NewPostForm />
        <CodeBlock />
      </div>
    </main>
  );
}
