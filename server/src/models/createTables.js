import { pool } from "../configs/databaseConfig.js";

export const createTablesIfNotExist = async () => {
  await createUsersTable();
  await createPostsTable();
  await createCodeBlocksTable();
  await createLikesTable();
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

// user id null = guest
//visibility = link_only, public, private
// expires at, null = permanent
export const createPostsTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS posts(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id INT REFERENCES users(id),
      title TEXT NOT NULL,
      description TEXT,
      visibility TEXT NOT NULL CHECK (visibility IN ('link_only', 'public', 'private')),
      expires_at TIMESTAMPTZ, 
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      likes INT DEFAULT 1
      )`);
  } catch (err) {
    console.error("unable to create Post Table", err);
    throw err;
  }
};
//TODO auto delete expired post

export const createCodeBlocksTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS code_blocks(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      post_id INT REFERENCES posts(id),
      title TEXT NOT NULL,
      code TEXT NOT NULL,
      language TEXT NOT NULL,
      description TEXT NOT NULL
      )`);
  } catch (err) {
    console.error("unable to create code table", err);
    throw err;
  }
};

export const createLikesTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS likes(
      post_id INT REFERENCES posts(id) ON DELETE CASCADE,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      PRIMARY KEY(post_id, user_id)
      )`);
  } catch (err) {
    console.error("unable to create likes table");
    throw err;
  }
};
