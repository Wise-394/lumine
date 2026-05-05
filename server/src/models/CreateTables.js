import { pool } from "../configs/databaseConfig.js";

export const createTablesIfNotExist = async () => {
  await createUsersTable();
  await createPostsTable();
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

export const createPostsTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS posts(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id INT REFERENCES users(id),
      title TEXT NOT NULL,
      description TEXT,
      visibility TEXT NOT NULL CHECK (visibility IN ('link_only', 'public', 'private')),
      expires_at TIMESTAMPTZ, 
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`);
  } catch (err) {
    console.error("unable to create Post Table", err);
    throw err;
  }
};

// user id null = guest
//visibility = link_only, public, private
// expires at, null = permanent
