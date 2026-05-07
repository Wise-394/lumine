import { Router } from "express";
import { getAllPostController } from "../controllers/postsController.js";
export const postsRouter = Router();

postsRouter.get("/", getAllPostController);
