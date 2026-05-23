import styles from "@styles/pages/Home.module.css";
import { useEffect, useState } from "react";
import { apiFetch } from "../helpers/api.js";
import { PostCard } from "../components/PostCard.jsx";

export function Home() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await apiFetch("/post");
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <main className={styles.homeContainer}>
      {posts === null ? (
        <p>loading posts...</p>
      ) : posts.length === 0 ? (
        <p>no posts yet.</p>
      ) : (
        <div className={styles.postListContainer}>
          {posts.map((post) => (
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
            />
          ))}
        </div>
      )}
    </main>
  );
}
