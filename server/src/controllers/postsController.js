import { getAllPost, insertPost } from "../models/postsQuery.js";
import { insertCodeBlock } from "../models/codeBlocksQuery.js";
export const getAllPostController = async (req, res) => {
  try {
    let posts;
    if (req.body.id) {
      posts = await getAllPost(req.body.id);
    } else {
      posts = await getAllPost();
    }
    res.json({ posts });
  } catch (err) {
    console.error("unable to get all posts", err);
    res.status(500).json({ message: "Failed to retrieve posts" });
  }
};

export const insertPostController = async (req, res) => {
  try {
    const userID = req.user ? req.user.id : null;
    const title = req.body.title;
    const description = req.body.description;
    const visibility = req.body.visibility;
    const expires_at = req.user ? null : "TODO"; //TODO EXPIRES AT
    const code = req.body.code;
    const language = req.body.language;
    const codeBlockDescription = req.body.codeBlockDescription;
    const result = await insertPost(
      userID,
      title,
      description,
      visibility,
      expires_at,
    );
    await insertCodeBlock(result.id, code, language, codeBlockDescription);
    res.json({ message: "success", postID: result.id });
  } catch (err) {
    console.error("unable to insert post", err);
    res.status(500).json({ message: "Failed to insert post" });
  }
};
