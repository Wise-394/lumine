import styles from "@styles/pages/Code.module.css";
import { NewPost } from "../components/NewPost.jsx";
export function Code() {
  return (
    <main className={styles.codeContainer}>
      <NewPost />
    </main>
  );
}
