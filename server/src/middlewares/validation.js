import { body } from "express-validator";

export const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .bail()
    .isAlphanumeric()
    .withMessage("Username cannot contain special characters")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Username must be within 1-15 characters long only"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Password must be within 1-15 characters long only"),
];
