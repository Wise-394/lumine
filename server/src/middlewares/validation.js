import { body } from "express-validator";

export const validateRegister = [
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

export const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .bail()
    .isAlphanumeric()
    .isLength({ max: 15 }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .isLength({ max: 15 }),
];

export const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title cannot be empty")
    .bail()
    .isLength({ min: 6, max: 256 })
    .withMessage("title must be 6-256 characters"),
  body("codeBlockTitle")
    .trim()
    .notEmpty()
    .withMessage("codeBlockTitle cannot be empty")
    .bail()
    .isLength({ min: 6, max: 256 })
    .withMessage("codeBlockTitle must be 6-256 characters"),
  body("language")
    .trim()
    .notEmpty()
    .withMessage("language cannot be empty")
    .bail()
    .isLength({ min: 1, max: 20 })
    .withMessage("language must be 1-50 characters"),
  body("code")
    .trim()
    .notEmpty()
    .withMessage("codeblock cannot be empty")
    .bail()
    .isLength({ max: 3000 }),
];
