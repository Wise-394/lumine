import { pool } from "../configs/databaseConfig.js";

export const insertLike = async (postId, UserId) => {
  try {
    await pool.query(`INSERT INTO likes(post_id, user_id) VALUES($1, $2)`, [
      postId,
      UserId,
    ]);
  } catch (err) {
    console.error("unable to insert like", err);
    throw err;
  }
};

export const deleteLike = async (UserId) => {
  try {
    await pool.query(`DELETE FROM likes WHERE user_id = $1`, [UserId]);
  } catch (err) {
    console.error("unable to delete like", err);
    throw err;
  }
};
