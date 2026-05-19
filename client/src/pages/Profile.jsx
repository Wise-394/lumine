import { useState, useEffect } from "react";
import { apiFetch } from "../helpers/api.js";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { getJWT } from "../helpers/localStorage.js";
import { GuestProfile } from "../components/GuestProfile.jsx";
import { ProfileCard } from "../components/ProfileCard.jsx";
import { PostCard } from "../components/PostCard.jsx";
import styles from "@styles/pages/Profile.module.css";

export function Profile() {
  const { user } = useAuthenticationStore();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchUser = async () => {
      const token = getJWT();
      const data = await apiFetch(`/user/${user.sub}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(data.posts);
    };

    fetchUser();
  }, [user]);

  if (!user) return <GuestProfile />;

  return (
    <main className={styles.profileContainer}>
      <ProfileCard />
      {posts === null ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard
              key={post.postId}
              postTitle={post.postTitle}
              postDescription={post.postDescription}
            />
          ))}
        </div>
      )}
    </main>
  );
}
