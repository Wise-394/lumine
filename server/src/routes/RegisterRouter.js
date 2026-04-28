import { Router } from "express";

export const registerRouter = Router();

registerRouter.get("/", (req, res) => console.log("nice"));
