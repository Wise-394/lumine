import styles from "@styles/pages/newPost.module.css";
import { NewPostForm } from "../components/NewPostForm.jsx";
import { LuSendHorizontal } from "react-icons/lu";
import { CodeBlock } from "../components/CodeBlock.jsx";
import { useNewPostStore } from "../store/newPostStore.jsx";
import { apiFetch } from "../helpers/api.js";
import { useNavigate } from "react-router";
// import { CodeBlock } from "../components/CodeBlock.jsx";
export function NewPost() {
  const navigate = useNavigate();
  const {
    title,
    description,
    language,
    codeBlockTitle,
    code,
    codeBlockDescription,
    resetField,
  } = useNewPostStore();

  const handleSubmit = async () => {
    try {
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
        resetField();
        return navigate("/");
      }
    } catch (err) {
      console.err(err);
      // TODO show  the error to the user for better ux
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
