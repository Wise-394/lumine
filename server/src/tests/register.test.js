import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import * as usersQuery from "../models/usersQuery.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("User Registration", () => {
  it("responds with error when username is empty", async () => {
    const res = await request(app)
      .post("/register")
      .send({ username: "", password: "123" });
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Username cannot be empty" }),
      ]),
    );
  });

  it("responds with error when password is empty", async () => {
    const res = await request(app)
      .post("/register")
      .send({ username: "test", password: "" });

    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Password cannot be empty" }),
      ]),
    );
  });

  it("responds with error when username already exists", async () => {
    vi.spyOn(usersQuery, "getUserByUsername").mockResolvedValue({
      id: 1,
      username: "test",
    });

    const res = await request(app)
      .post("/register")
      .send({ username: "test", password: "test" });

    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "username already exist" }),
      ]),
    );
  });

  it("responds with id when registration is succesful", async () => {
    vi.spyOn(usersQuery, "getUserByUsername").mockResolvedValue(null);
    vi.spyOn(usersQuery, "insertUser").mockResolvedValue({
      id: 1,
    });

    const res = await request(app)
      .post("/register")
      .send({ username: "test", password: "test" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1 });
  });
});
