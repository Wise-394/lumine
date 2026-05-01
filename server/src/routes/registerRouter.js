import { Router } from "express";
import {
  checkIfUsernameExist,
  registerUser,
} from "../controllers/registerController.js";
import { validateRegister } from "../middlewares/validation.js";
export const registerRouter = Router();

registerRouter.post("/", validateRegister, checkIfUsernameExist, registerUser);
