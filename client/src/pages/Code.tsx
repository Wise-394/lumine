import styles from "@styles/pages/Code.module.css";
import { NewPost } from "./NewPost.jsx";
export function Code() {
  return (
    <main className={styles.container}>
      <NewPost />
    </main>
  );
}
