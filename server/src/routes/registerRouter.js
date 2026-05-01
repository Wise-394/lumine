import { Router } from "express";
import {
  checkIfUsernameExist,
  registerUser,
} from "../controllers/registerController.js";
import { validateUser } from "../middlewares/validation.js";
export const registerRouter = Router();

registerRouter.post("/", validateUser, checkIfUsernameExist, registerUser);
