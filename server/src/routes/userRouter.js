import { Router } from "express";
import { authenticateUser } from "../middlewares/authenticate.js";
import { getUserPosts } from "../controllers/userController.js";
export const userRouter = Router();

userRouter.get("/:id", authenticateUser, getUserPosts);
