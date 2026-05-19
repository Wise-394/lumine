import { useAuthenticationStore } from "../store/authenticationStore.jsx";
export function PostCard({
  postTitle,
  postDescription = null,
  codeTitle,
  language,
  code,
  codeDescription,
}) {
  const { user } = useAuthenticationStore();
  const username = user.username;
  return (
    <div>
      <p>@{username}</p>
      <p>{postTitle}</p>
      {postDescription && <p>{postDescription}</p>}
    </div>
  );
}
