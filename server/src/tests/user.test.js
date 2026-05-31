import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import * as postQuery from "../models/postsQuery.js";
import jwt from "jsonwebtoken";
import * as usersQuery from "../models/usersQuery.js";
afterEach(() => {
  vi.restoreAllMocks();
});

describe("user route", () => {
  const token = jwt.sign({ sub: 1, username: "test" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  it("says error when not authenticated", async () => {
    const res = await request(app).get("/user/1");

    expect(res.status).toBe(401);
  });

  it("sends back all the posts of user_id", async () => {
    vi.spyOn(postQuery, "getAllPost").mockResolvedValue([
      {
        id: 1,
        title: "test",
      },
      {
        id: 2,
        title: "test2",
      },
    ]);
    vi.spyOn(usersQuery, "getUserById").mockResolvedValue({ id: 1 });

    console.log(process.env.JWT_SECRET);
    const res = await request(app)
      .get("/user/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
