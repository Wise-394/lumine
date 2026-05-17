import { pool } from "../configs/databaseConfig.js";

export const getCodeBlockByPostID = async (post_id) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM code_blocks WHERE post_id = $1`,
      [post_id],
    );
    return rows[0];
  } catch (err) {
    console.error("unable to get code_block by post_id", err);
    throw err;
  }
};

export const insertCodeBlock = async (
  post_id,
  title,
  code,
  language,
  description,
) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO code_blocks(post_id, title, code, language, description) VALUES ($1, $2,$3,$4, $5) RETURNING *`,
      [post_id, title, code, language, description],
    );
    return rows[0];
  } catch (err) {
    console.error("unable to insert code_block", err);
    throw err;
  }
};
export const updateCodeBlock = async (
  id,
  title,
  code,
  language,
  description,
) => {
  try {
    await pool.query(
      `UPDATE code_blocks SET
      title = COALESCE($1, title)
      code = COALESCE($2, code),
      language = COALESCE($3, language),
      description = COALESCE($4, description)
      WHERE id = $5`,
      [title, code, language, description, id],
    );
  } catch (err) {
    console.error("unable to update code_block", err);
    throw err;
  }
};
export const deleteCodeBlock = async (id) => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM code_blocks WHERE id = $1 RETURNING *`,
      [id],
    );
    return rows[0];
  } catch (err) {
    console.error("unable to delete code_block", err);
    throw err;
  }
};
