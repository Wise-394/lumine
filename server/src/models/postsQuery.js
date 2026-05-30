import { pool } from "../configs/databaseConfig.js";

export const getAllPost = async (user_id = null) => {
  try {
    const selectClause = `
      SELECT 
        posts.id AS "postId",
        posts.user_id AS "userId",
        users.username AS "username",
        posts.title AS "postTitle",
        posts.description AS "postDescription",
        posts.visibility,
        posts.expires_at AS "expiresAt",
        posts.created_at AS "createdAt",
        code_blocks.id AS "codeBlockId",
        code_blocks.title AS "codeBlockTitle",
        code_blocks.code,
        code_blocks.language,
        code_blocks.description AS "codeBlockDescription",
        COUNT(likes.post_id) AS "likesCount",
        BOOL_OR(likes.user_id = $1) AS "likedByUser"
      FROM posts 
      INNER JOIN code_blocks ON code_blocks.post_id = posts.id
      INNER JOIN users ON users.id = posts.user_id
      LEFT JOIN likes ON likes.post_id = posts.id
    `;

    const query = user_id
      ? {
          text:
            selectClause +
            `WHERE posts.user_id = $1 GROUP BY posts.id, users.username, code_blocks.id`,
          values: [user_id],
        }
      : {
          text:
            selectClause + `GROUP BY posts.id, users.username, code_blocks.id`,
          values: [null],
        };

    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("unable to get all post", err);
    throw err;
  }
};

export const getPostById = async (id, userId = null) => {
  try {
    const { rows } = await pool.query(
      `SELECT 
        posts.id AS "postId",
        posts.user_id AS "userId",
        posts.title AS "postTitle",
        posts.description AS "postDescription",
        posts.visibility,
        posts.expires_at AS "expiresAt",
        posts.created_at AS "createdAt",
        code_blocks.id AS "codeBlockId",
        code_blocks.title AS "codeBlockTitle",
        code_blocks.code,
        code_blocks.language,
        code_blocks.description AS "codeBlockDescription",
        COUNT(likes.post_id) AS "likesCount",
        BOOL_OR(likes.user_id = $2) AS "likedByUser"
      FROM posts 
      INNER JOIN code_blocks ON code_blocks.post_id = posts.id
      LEFT JOIN likes ON likes.post_id = posts.id
      WHERE posts.id = $1
      GROUP BY posts.id, code_blocks.id`,
      [id, userId],
    );
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
    await pool.query(`DELETE FROM posts where id = $1`, [id]);
  } catch (err) {
    console.error("unable to delete post", err);
    throw err;
  }
};

// TODO ADD LIKES
