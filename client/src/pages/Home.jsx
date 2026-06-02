import styles from "@styles/pages/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../helpers/api.js";
import { PostCard } from "../components/PostCard.jsx";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { GuestPopUp } from "../components/GuestPopUp.jsx";

export function Home() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuthenticationStore();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiFetch(
          `/posts${userId ? `?userId=${userId}` : ""}`,
        );
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <main className={styles.homeContainer}>
      <GuestPopUp isOpen={isOpen} setIsOpen={setIsOpen} dialogRef={dialogRef} />
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
              likesCount={post.likesCount}
              likedByUser={post.likedByUser}
              setIsOpenDialog={setIsOpen}
            />
          ))}
        </div>
      )}
    </main>
  );
}

// TODO ADD POP UP TO GUEST IF TRYING TO LIKE POSTS
