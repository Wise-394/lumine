import express from "express";
import { createTablesIfNotExist } from "./src/models/createTables.js";
import cors from "cors";
import { registerRouter } from "./src/routes/registerRouter.js";
import { passportSetup } from "./src/configs/PassportConfig.js";
import { loginRouter } from "./src/routes/loginRouter.js";
import { postsRouter } from "./src/routes/postsRouter.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
createTablesIfNotExist();
passportSetup();

//routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/post", postsRouter);
export default app;
