import { Router } from "express";
import { checkIfUsernameExist } from "../controllers/registerController.js";
export const registerRouter = Router();

registerRouter.get("/", checkIfUsernameExist);
