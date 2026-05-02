import { pool } from "../configs/databaseConfig.js";

export const getUserById = async (id) => {
  try {
    const { rows } = await pool.query(
      `
        SELECT * FROM users WHERE id = $1 LIMIT 1
    `,
      [id],
    );
    return rows[0];
  } catch (err) {
    console.error("unable to  get user by id", err);
    throw err;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const { rows } = await pool.query(
      `
        SELECT * FROM users WHERE username = $1
        `,
      [username],
    );
    return rows[0];
  } catch (err) {
    console.error("unable to get user by username", err);
    throw err;
  }
};

export const insertUser = async (username, password, role) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO users(username, password, role) VALUES($1, $2, $3) RETURNING id`,
      [username, password, role],
    );
    return rows[0].id;
  } catch (err) {
    console.error("unable to insert user", err);
    throw err;
  }
};
