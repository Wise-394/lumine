import { Router } from "express";
import passport from "passport";
import { optionalAuth } from "../middlewares/optionalAuth.js";
import {
  getAllPostController,
  insertPostController,
  updatePostController,
  getPostByIDController,
  deletePostByIdController,
} from "../controllers/postsController.js";
import { validatePost } from "../middlewares/validation.js";
import { authenticateUser } from "../middlewares/authenticate.js";

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
postsRouter.delete("/:id", authenticateUser, deletePostByIdController);

// likes
postsRouter.post("/:id/likes");
postsRouter.delete("/:id/likes");
