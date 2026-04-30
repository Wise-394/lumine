import { getUserByUsername } from "../models/usersQuery.js";
export const checkIfUsernameExist = async (req, res, next) => {
  const users = await getUserByUsername(req.body.username);
  if (users) {
    return res.status(400).json({ message: "username already exist" });
  }
  next();
};
