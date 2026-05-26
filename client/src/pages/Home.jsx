import styles from "@styles/pages/Home.module.css";
import { useEffect, useState } from "react";
import { apiFetch } from "../helpers/api.js";
import { PostCard } from "../components/PostCard.jsx";

export function Home() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiFetch("/post");
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className={styles.homeContainer}>
      {error && <p>{error}</p>}
      {isLoading && error === null ? (
        <p>loading posts...</p>
      ) : posts?.length === 0 ? (
        <p>no posts yet.</p>
      ) : (
        <div className={styles.postListContainer}>
          {posts?.map((post) => (
            <PostCard
              key={post.postId}
              username={post.username}
              postUserId={post.userId}
              postTitle={post.postTitle}
              postDescription={post.postDescription}
              codeTitle={post.codeBlockTitle}
              language={post.language}
              code={post.code}
              codeDescription={post.codeBlockDescription}
              setPosts={setPosts}
              postId={post.postId}
            />
          ))}
        </div>
      )}
    </main>
  );
}
