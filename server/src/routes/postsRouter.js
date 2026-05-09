import { Router } from "express";
import {
  authenticateUser,
  getAllPostController,
  insertPostController,
  updatePostController,
  getPostByIDController,
} from "../controllers/postsController.js";
import { validatePost } from "../middlewares/validation.js";
export const postsRouter = Router();

postsRouter.get("/", getAllPostController);
postsRouter.get("/:id", getPostByIDController);
postsRouter.post("/", validatePost, insertPostController);
postsRouter.put("/:id", authenticateUser, validatePost, updatePostController);
