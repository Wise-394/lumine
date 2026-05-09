import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import * as postsQuery from "../models/postsQuery.js";
import * as usersQuery from "../models/usersQuery.js";
import * as codeBlocksQuery from "../models/codeBlocksQuery.js";
import jwt from "jsonwebtoken";
afterEach(() => {
  vi.restoreAllMocks();
});

// postsRouter.get("/", getAllPostController);
// postsRouter.get("/:id", getPostByIDController);
// postsRouter.post("/", validatePost, insertPostController);
// postsRouter.put("/:id", authenticateUser, validatePost, updatePostController);
describe("posts routes", () => {
  it("responds with all posts when no id specified", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];
    vi.spyOn(postsQuery, "getAllPost").mockResolvedValue(mockPosts);

    const res = await request(app).get("/post");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ posts: mockPosts });
  });

  it("responds with error when input valid", async () => {
    const res = await request(app).post("/post").send({ title: "" });

    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "title cannot be empty" }),
      ]),
    );
  });

  it("responds with error when not allowed to update post based on id", async () => {
    vi.spyOn(usersQuery, "getUserById").mockResolvedValue({ id: 1 });
    vi.spyOn(postsQuery, "getPostById").mockResolvedValue({
      id: 1,
      user_id: 99,
    });

    const token = jwt.sign({ sub: 1 }, process.env.JWT_SECRET);

    const res = await request(app)
      .put("/post/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated",
        description: "desc",
        visibility: "public",
        code: "console.log()",
        language: "javascript",
        codeBlockDescription: "a block",
      });

    console.log(res.status, res.body); // ← add this

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "unable to update the post" });
  });
  it("respond with error when post id not found", async () => {
    vi.spyOn(postsQuery, "getPostById").mockRejectedValue(
      new Error("not found"),
    );

    const res = await request(app).get("/post/999");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Failed to get post id" });
  });
});

// TODO FINISH TEST
