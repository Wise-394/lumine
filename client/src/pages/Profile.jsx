import { useState, useEffect } from "react";
import { apiFetch } from "../helpers/api.js";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { getJWT } from "../helpers/localStorage.js";
import { GuestProfile } from "../components/GuestProfile.jsx";
import { ProfileCard } from "../components/ProfileCard.jsx";
import { PostCard } from "../components/PostCard.jsx";
import styles from "@styles/pages/Profile.module.css";

export function Profile() {
  const { user, userId } = useAuthenticationStore();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchUser = async () => {
      const token = getJWT();
      const data = await apiFetch(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(data.posts);
    };

    fetchUser();
  }, [user, userId]);

  if (!user) return <GuestProfile />;

  return (
    <main className={styles.profileContainer}>
      <ProfileCard totalPost={posts?.length ?? 0} />
      {posts === null ? (
        <p className={styles.stateMessage}>loading posts...</p>
      ) : posts.length === 0 ? (
        <p className={styles.stateMessage}>no posts yet.</p>
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
              likesCount={post.likesCount}
              likedByUser={post.likedByUser}
              setPosts={setPosts}
              postId={post.postId}
            />
          ))}
        </div>
      )}
    </main>
  );
}
