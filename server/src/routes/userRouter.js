import { Router } from "express";
import { authenticateUser } from "../middlewares/authenticate.js";
import { getUserPostsController } from "../controllers/userController.js";
export const userRouter = Router();

userRouter.get("/:id", authenticateUser, getUserPostsController);
