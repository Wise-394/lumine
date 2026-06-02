import { pool } from "../configs/databaseConfig.js";

export const createTablesIfNotExist = async () => {
  await createUsersTable();
  await createPostsTable();
  await createCodeBlocksTable();
  await createLikesTable();
  await seedInitialData();
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
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      likes INT DEFAULT 1
      )`);
  } catch (err) {
    console.error("unable to create Post Table", err);
    throw err;
  }
};

export const createCodeBlocksTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS code_blocks(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      post_id INT REFERENCES posts(id) ON DELETE CASCADE,
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

export const seedInitialData = async () => {
  try {
    const { rows } = await pool.query(`SELECT COUNT(*) FROM users`);
    if (parseInt(rows[0].count) > 0) return;

    // --- Users ---
    const usersResult = await pool.query(`
      INSERT INTO users (username, password, role) VALUES
        ('alice',   '$2b$10$placeholderHashAlice',   'admin'),
        ('bob',     '$2b$10$placeholderHashBob',     'user'),
        ('charlie', '$2b$10$placeholderHashCharlie', 'user'),
        ('diana',   '$2b$10$placeholderHashDiana',   'user')
      RETURNING id
    `);
    const [aliceId, bobId, charlieId, dianaId] = usersResult.rows.map(
      (r) => r.id,
    );

    // --- Posts ---
    const postsResult = await pool.query(
      `
      INSERT INTO posts (user_id, title, description, visibility, expires_at, likes) VALUES
        ($1, 'Debounce Hook',        'A reusable React hook for debouncing values.',          'public', NULL,                       12),
        ($2, 'Express Auth Snippet', 'JWT middleware for Express with refresh token support.', 'public', NOW() + INTERVAL '30 days', 8),
        ($3, 'Python Merge Sort',    'Clean recursive merge sort implementation in Python.',   'public', NULL,                       3),
        ($1, 'SQL Pagination',       'Offset + keyset pagination patterns for PostgreSQL.',    'public', NULL,                       20),
        ($4, 'CSS Grid Cheatsheet',  'A handy reference for CSS grid layout properties.',      'public', NULL,                       6)
      RETURNING id
      `,
      [aliceId, bobId, charlieId, dianaId],
    );
    const [p1, p2, p3, p4, p5] = postsResult.rows.map((r) => r.id);

    // --- Code Blocks ---
    await pool.query(
      `
      INSERT INTO code_blocks (post_id, title, code, language, description) VALUES
        ($1, 'useDebounce',
          $code$ import { useState, useEffect } from "react";
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
} $code$,
          'javascript', 'Drop-in debounce hook for controlled inputs.'),

        ($2, 'verifyToken middleware',
          $code$ import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}; $code$,
          'javascript', 'Bearer-token middleware; mount before protected routes.'),

        ($3, 'merge_sort',
          $code$ def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:] $code$,
          'python', 'O(n log n) stable sort with no external dependencies.'),

        ($4, 'Offset pagination',
          $code$ -- Page N (0-indexed), page size 20
SELECT * FROM posts
ORDER BY created_at DESC
LIMIT 20 OFFSET (page_number * 20); $code$,
          'sql', 'Simple offset pagination; swap for keyset on large tables.'),

        ($5, 'CSS Grid basics',
          $code$ .container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}
.item-span-2 {
  grid-column: span 2;
} $code$,
          'css', 'Basic grid container with 3 equal columns and a spanning item.')
      `,
      [p1, p2, p3, p4, p5],
    );

    // --- Likes ---
    await pool.query(
      `
      INSERT INTO likes (post_id, user_id) VALUES
        ($1, $6), ($1, $7), ($1, $8),
        ($2, $6), ($2, $8),
        ($3, $7),
        ($4, $6), ($4, $7), ($4, $8), ($4, $9),
        ($5, $9)
      ON CONFLICT DO NOTHING
      `,
      [p1, p2, p3, p4, p5, aliceId, bobId, charlieId, dianaId],
    );

    console.log("Seed data inserted.");
  } catch (err) {
    console.error("Failed to seed initial data:", err);
    throw err;
  }
};
