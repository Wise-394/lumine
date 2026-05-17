import styles from "@styles/pages/newPost.module.css";
import { NewPostForm } from "../components/NewPostForm.jsx";
import { LuSendHorizontal } from "react-icons/lu";
import { CodeBlock } from "../components/CodeBlock.jsx";
import { useNewPostStore } from "../store/newPostStore.jsx";
import { apiFetch } from "../helpers/api.js";
// import { CodeBlock } from "../components/CodeBlock.jsx";
export function NewPost() {
  const {
    title,
    description,
    language,
    codeBlockTitle,
    code,
    codeBlockDescription,
  } = useNewPostStore();

  const handleSubmit = async () => {
    const res = await apiFetch("/post", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        visibility: "public",
        code,
        language,
        codeBlockTitle,
        codeBlockDescription,
      }),
    });

    if (res) {
      console.log("success");
    }
  };
  return (
    <main className={styles.newPostContainer}>
      <div className={styles.header}>
        <h1>
          <span className="highlight">New Post </span>
        </h1>
        <button type="button" onClick={handleSubmit}>
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
