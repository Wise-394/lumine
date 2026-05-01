import express from "express";
import { createTablesIfNotExist } from "./src/models/CreateTables.js";
import cors from "cors";
import { registerRouter } from "./src/routes/registerRouter.js";
import { passportSetup } from "./src/configs/PassportConfig.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
createTablesIfNotExist();
passportSetup();

//routes
app.use("/register", registerRouter);

export default app;
