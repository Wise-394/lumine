import express from "express";
import { createTablesIfNotExist } from "./src/models/CreateTables.js";
import cors from "cors";
import { registerRouter } from "./src/routes/registerRouter.js";
import { passportSetup } from "./config/passport.js";

const app = express();
app.use(cors());
createTablesIfNotExist();
passportSetup();

//routes
app.use("/register", registerRouter);

app
  .listen(process.env.PORT, () => {
    console.log("Server is running at localhost:", process.env.PORT);
  })
  .on("error", (err) => {
    console.log(err);
  });
