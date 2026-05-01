import { Router } from "express";
import { loginUser } from "../controllers/loginController.js";
import { validateLogin } from "../middlewares/validation.js";

export const loginRouter = Router();

loginRouter.post("/", validateLogin, loginUser);
