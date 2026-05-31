import styles from "@styles/pages/Post.module.css";
import { PostForm } from "../components/PostForm.jsx";
import { LuSendHorizontal, LuLoader } from "react-icons/lu";
import { CodeBlock } from "../components/CodeBlock.jsx";
import { usePostStore } from "../store/PostStore.jsx";
import { apiFetch } from "../helpers/api.js";
import { useNavigate, useParams } from "react-router";
import { getJWT } from "../helpers/localStorage.js";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { redirectIfNotAuthenticated } from "../helpers/redirect.jsx";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";

export function Post() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { isLoggedIn, isGuest, userId } = useAuthenticationStore();
  const token = getJWT();
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
    setPost,
  } = usePostStore();

  const [isFetching, setIsFetching] = useState(isEditMode);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchPost = async () => {
      try {
        setFetchError(null);
        const data = await apiFetch(`/posts/${id}`);
        if (!data.post || Object.keys(data.post).length === 0) {
          return navigate("/post");
        }
        if (data.post.userId !== userId) {
          return navigate("/post");
        }
        setPost(data.post);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchPost();

    return () => {
      resetField();
    };
  }, [id, isEditMode, navigate, resetField, setPost, userId]);

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(isEditMode ? `/posts/${id}` : "/posts", {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
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

  if (isFetching)
    return (
      <main>
        <p>Loading post...</p>
      </main>
    );
  if (fetchError)
    return (
      <main>
        <p>{fetchError}</p>
      </main>
    );
  const redirect = redirectIfNotAuthenticated(isLoggedIn, isGuest);
  if (redirect) {
    return redirect;
  }

  return (
    <main className={styles.PostContainer}>
      <div className={styles.header}>
        {isEditMode && (
          <button className={styles.backButton}>
            <IoIosArrowBack /> Back
          </button>
        )}
        <h1>
          <span className="highlight">
            {isEditMode ? "Edit Post" : "New Post"}
          </span>
        </h1>
        <div className={styles.headerRight}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={styles.cta}
          >
            {loading ? (
              <>
                <LuLoader className={styles.spinnerIcon} />{" "}
                {isEditMode ? "Saving..." : "Posting..."}
              </>
            ) : (
              <>
                <LuSendHorizontal /> {isEditMode ? "Save" : "Post"}
              </>
            )}
          </button>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      </div>

      <div className={styles.body}>
        <PostForm />
        <CodeBlock />
      </div>
    </main>
  );
}
