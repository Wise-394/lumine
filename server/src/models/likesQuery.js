import { pool } from "../configs/databaseConfig.js";

export const insertLike = async (postId, UserId) => {
  try {
    await pool.query(`INSERT INTO likes(post_id, user_id) VALUES($1, $2)`, [
      postId,
      UserId,
    ]);

    const { rows } = await pool.query(
      `SELECT COUNT(*) AS like_count FROM likes WHERE post_id = $1`,
      [postId],
    );
    return parseInt(rows[0].like_count, 10);
  } catch (err) {
    console.error("unable to insert like", err);
    throw err;
  }
};

export const deleteLike = async (postId, UserId) => {
  try {
    const result = await pool.query(
      `DELETE FROM likes WHERE user_id = $1 AND post_id = $2`,
      [UserId, postId],
    );
    if (result.rowCount <= 0) {
      return false;
    }
    const { rows } = await pool.query(
      `SELECT COUNT(*) AS like_count FROM likes WHERE post_id = $1`,
      [postId],
    );
    return parseInt(rows[0].like_count, 10);
  } catch (err) {
    console.error("unable to delete like", err);
    throw err;
  }
};
