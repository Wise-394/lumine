import { Router } from "express";
import { optionalAuth } from "../middlewares/optionalAuth.js";
import {
  getAllPostController,
  insertPostController,
  updatePostController,
  getPostByIDController,
  deletePostByIdController,
  increasePostLikes,
  decreasePostLikes,
} from "../controllers/postsController.js";
import { validatePost } from "../middlewares/validation.js";
import { authenticateUser } from "../middlewares/authenticate.js";

export const postsRouter = Router();

postsRouter.get("/", getAllPostController);
postsRouter.get("/:id", getPostByIDController);
postsRouter.post("/", optionalAuth, validatePost, insertPostController);
postsRouter.put("/:id", authenticateUser, validatePost, updatePostController);
postsRouter.delete("/:id", authenticateUser, deletePostByIdController);

postsRouter.post("/:id/likes", authenticateUser, increasePostLikes);
postsRouter.delete("/:id/likes", authenticateUser, decreasePostLikes);

// TODO CHANGE TO POSTS (not post)
