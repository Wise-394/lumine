import { pool } from "../configs/databaseConfig.js";

export const getAllPost = async (user_id = null) => {
  try {
    const query = user_id
      ? { text: "SELECT * FROM posts WHERE user_id = $1", values: [user_id] }
      : { text: "SELECT * FROM posts" };

    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("unable to get all post", err);
    throw err;
  }
};

export const getPostById = (id) => {
  try {
    const { rows } = pool.query("SELECT * FROM POSTS WHERE id = $1", [id]);
    return rows[0];
  } catch (err) {
    console.error("unable to get post by id", err);
    throw err;
  }
};

export const insertPost = () => {};
export const updatePost = () => {};
