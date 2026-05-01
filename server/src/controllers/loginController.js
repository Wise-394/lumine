import { getUserByUsername } from "../models/usersQuery.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await getUserByUsername(req.body.username);
    if (!user) {
      return res.status(401).json({
        errors: [{ msg: "Username doesn't exist", path: "username" }],
      });
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(401).json({
        errors: [{ msg: "Incorrect Password", path: "password" }],
      });
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token: `Bearer ${token}` });
  } catch (err) {
    console.error("unable to login user", err);
    return next(new Error("unable to login"));
  }
};
