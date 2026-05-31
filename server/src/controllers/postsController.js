import {
  getAllPost,
  getPostById,
  insertPost,
  updatePost,
  deletePost,
} from "../models/postsQuery.js";
import { insertLike, deleteLike } from "../models/likesQuery.js";
import { validationResult } from "express-validator";
import { insertCodeBlock, updateCodeBlock } from "../models/codeBlocksQuery.js";

const GUEST_POST_EXPIRY_DAYS = 7;
export const getAllPostController = async (req, res) => {
  try {
    const posts = await getAllPost();
    res.json({ posts });
  } catch (err) {
    console.error("unable to get all posts", err);
    res.status(500).json({ message: "Failed to retrieve posts" });
  }
};

export const insertPostController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      language,
      visibility,
      codeBlockTitle,
      code,
      codeBlockDescription,
    } = req.body;
    const userId = req.user?.id ?? null;
    const expires_at = userId
      ? null
      : new Date(
          Date.now() + GUEST_POST_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
        ).toISOString();

    console.log("req.user", req.user);
    const result = await insertPost(
      userId,
      title,
      description,
      visibility,
      expires_at,
    );
    await insertCodeBlock(
      result.id,
      codeBlockTitle,
      code,
      language,
      codeBlockDescription,
    );

    res.status(201).json({ message: "success", postID: result.id });
  } catch (err) {
    console.error("unable to insert post", err);
    res.status(500).json({ message: "Failed to insert post" });
  }
};

export const updatePostController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (req.user.id !== post.userId) {
      return res.status(401).json({ message: "not authorized" });
    }

    const {
      title,
      description,
      visibility,
      code,
      language,
      codeBlockTitle,
      codeBlockDescription,
    } = req.body;

    const updatedPost = await updatePost(
      req.params.id,
      title,
      description,
      visibility,
    );
    console.log(updatedPost);
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    await updateCodeBlock(
      req.params.id,
      codeBlockTitle,
      code,
      language,
      codeBlockDescription,
    );

    res.json({ message: "success" });
  } catch (err) {
    console.error("unable to update post", err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const getPostByIDController = async (req, res) => {
  try {
    const post = await getPostById(req.params.id, req.user?.id);
    res.json({ post: post });
  } catch (err) {
    console.error("unable to get post by id", err);
    res.status(500).json({ message: "Failed to get post id" });
  }
};

export const deletePostByIdController = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (post.userId != req.user.id) {
      return res.status(403).json({ message: "not allowed to delete post" });
    }
    await deletePost(req.params.id);
    return res.json({ message: "success" });
  } catch (err) {
    console.error("unable to delete post", err);
    res.status(500).json({ message: "failed to delete post" });
  }
};

export const increasePostLikes = async (req, res) => {
  try {
    const postId = req.params.id;
    const likes = await insertLike(postId, req.user.id);
    return res.status(200).json({ likes });
  } catch (err) {
    console.error("unable to increase like", err);
    res.status(500).json({ message: "failed to like post" });
  }
};

export const decreasePostLikes = async (req, res) => {
  try {
    const likes = await deleteLike(req.params.id, req.user.id);
    if (likes === false) {
      return res.status(401).json({ message: "unauthorized" });
    }
    return res.status(200).json({ likes });
  } catch (err) {
    console.error("unable to decrease like", err);
    res.status(500).json({ message: "failed to decrease post likes" });
  }
};
