import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import * as likesQuery from "../models/likesQuery.js";
afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock("../middlewares/authenticate.js", () => ({
  authenticateUser: (req, res, next) => {
    req.user = { id: 1 };
    console.log(req.user);
    next();
  },
}));

describe("likes", () => {
  it("likes user post", async () => {
    vi.spyOn(likesQuery, "insertLike").mockResolvedValue({ likes: 1 });
    const res = await request(app).post("/posts/1/likes");

    expect(res.status).toBe(200);
  });
  it("dislike user post", async () => {
    vi.spyOn(likesQuery, "deleteLike").mockResolvedValue({ likes: 0 });
  });
  it("it prevent disliking if not liked");
});
