import { pool } from "../configs/databaseConfig.js";

export const createTablesIfNotExist = async () => {
  await createUsersTable();
};

const createUsersTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )`);
  } catch (err) {
    console.error("unable to create table users", err);
    throw err;
  }
};
