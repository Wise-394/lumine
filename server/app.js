import express from "express";
import { createTablesIfNotExist } from "./src/models/createTables.js";
import cors from "cors";
import { registerRouter } from "./src/routes/registerRouter.js";
import { passportSetup } from "./src/configs/PassportConfig.js";
import { loginRouter } from "./src/routes/loginRouter.js";
import { postsRouter } from "./src/routes/postsRouter.js";
import { userRouter } from "./src/routes/userRouter.js";
import { errorRouter } from "./src/routes/errorRouter.js";
import cron from "node-cron";
import { deleteExpiredPost } from "./src/models/postsQuery.js";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
await createTablesIfNotExist();
passportSetup();

//AUTO DELETE EXPIRED POSTS
deleteExpiredPost();
cron.schedule("0 0 * * *", deleteExpiredPost);

//routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use(errorRouter);

export default app;
