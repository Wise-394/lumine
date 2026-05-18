import styles from "@styles/pages/newPost.module.css";
import { NewPostForm } from "../components/NewPostForm.jsx";
import { LuSendHorizontal, LuLoader } from "react-icons/lu";
import { CodeBlock } from "../components/CodeBlock.jsx";
import { useNewPostStore } from "../store/newPostStore.jsx";
import { apiFetch } from "../helpers/api.js";
import { useNavigate } from "react-router";

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
    setLoading,
    setError,
    loading,
    error,
    validate,
  } = useNewPostStore();

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);

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
        navigate("/");
      }
    } catch (err) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.newPostContainer}>
      <div className={styles.header}>
        <h1>
          <span className="highlight">New Post</span>
        </h1>
        <div className={styles.headerRight}>
          <button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <LuLoader className={styles.spinnerIcon} /> Posting...
              </>
            ) : (
              <>
                <LuSendHorizontal /> Post
              </>
            )}
          </button>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      </div>

      <div className={styles.body}>
        <NewPostForm />
        <CodeBlock />
      </div>
    </main>
  );
}
