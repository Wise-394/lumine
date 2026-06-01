import { getPostsByUser } from "../models/postsQuery.js";

export const getUserPostsController = async (req, res, next) => {
  try {
    const posts = await getPostsByUser(req.user.id);
    return res.json({ posts });
  } catch (err) {
    console.error("unable to get user posts", err);
    return next(new Error("unable to get user posts"));
  }
};
