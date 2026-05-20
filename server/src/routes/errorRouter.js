import { Router } from "express";

export const errorRouter = Router();

errorRouter.use((err, req, res, _next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});
