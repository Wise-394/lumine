import { Router } from "express";
import passport from "passport";
import { optionalAuth } from "../middlewares/optionalAuth.js";
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
postsRouter.post("/", optionalAuth, validatePost, insertPostController);
postsRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authenticateUser,
  validatePost,
  updatePostController,
);
