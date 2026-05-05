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

export const insertPost = async (
  user_id = null,
  title,
  description,
  visibility,
  expires_at,
) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO posts(user_id, title, description, visibility, expires_at) 
   VALUES ($1,$2,$3,$4,$5) 
   RETURNING *`,
      [user_id, title, description, visibility, expires_at],
    );
    return rows[0];
  } catch (err) {
    console.error("unable to insert post", err);
    throw err;
  }
};

export const updatePost = async (
  id,
  title = null,
  description = null,
  visibility = null,
) => {
  try {
    const { rows } = await pool.query(
      `UPDATE posts SET 
        title = COALESCE($1, title), 
        description = COALESCE($2, description), 
        visibility = COALESCE($3, visibility) 
       WHERE id = $4 
       RETURNING *`,
      [title, description, visibility, id],
    );
    return rows[0];
  } catch (err) {
    console.error("Unable to update post", err);
    throw err;
  }
};

export const deletePost = async (id) => {
  try {
    await pool(`DELETE FROM posts where id = $1`, [id]);
  } catch (err) {
    console.error("unable to delete post", err);
    throw err;
  }
};
