import { Router } from "express";
import {
  getAllPostController,
  insertPostController,
  updatePostController,
} from "../controllers/postsController.js";
import { validatePost } from "../middlewares/validation.js";
export const postsRouter = Router();

postsRouter.get("/", getAllPostController);
postsRouter.post("/", validatePost, insertPostController);
postsRouter.put("/", validatePost, updatePostController);
