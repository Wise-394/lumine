import { useParams } from "react-router";

export function PostDetail() {
  const { id } = useParams();
  return <p> nice {id}</p>;
}
