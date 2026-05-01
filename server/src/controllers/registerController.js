import { getUserByUsername, insertUser } from "../models/usersQuery.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

export const checkIfUsernameExist = async (req, res, next) => {
  const users = await getUserByUsername(req.body.username);
  if (users) {
    return res
      .status(400)
      .json({ errors: [{ msg: "username already exist", field: "username" }] });
  }
  next();
};

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);

    const id = await insertUser(username, password, "user");
    return res.json({ id });
  } catch (err) {
    console.error("unable to register user", err);
    next(new Error("unable to create user"));
  }
};
