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
    next();
  },
}));

describe("likes", () => {
  it("likes user post", async () => {
    vi.spyOn(likesQuery, "insertLike").mockResolvedValue(1);
    const res = await request(app).post("/posts/1/likes");

    expect(res.status).toBe(200);
  });
  it("prevent disliking if not like", async () => {
    vi.spyOn(likesQuery, "deleteLike").mockResolvedValue(false);
    const res = await request(app).delete("/posts/1/likes");
    expect(res.status).toBe(401);
  });
  it("dislike post", async () => {
    vi.spyOn(likesQuery, "deleteLike").mockResolvedValue(1);
    const res = await request(app).delete("/posts/1/likes");
    expect(res.status).toBe(200);
  });
});
