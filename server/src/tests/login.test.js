import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import * as usersQuery from "../models/usersQuery.js";
import bcrypt from "bcryptjs";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("User Login", () => {
  it("responds with error when username is empty", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "", password: "12345678" });

    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Username cannot be empty" }),
      ]),
    );
  });

  it("responds with error when password is empty", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "test", password: "" });

    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Password cannot be empty" }),
      ]),
    );
  });

  it("responds with error when username doesn't exist", async () => {
    vi.spyOn(usersQuery, "getUserByUsername").mockResolvedValue(null);
    const res = await request(app)
      .post("/login")
      .send({ username: "test", password: "123456" });

    expect(res.status).toBe(401);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Username doesn't exist" }),
      ]),
    );
  });

  it("it responds with error when incorrect password", async () => {
    vi.spyOn(usersQuery, "getUserByUsername").mockResolvedValue({
      username: "test",
      password: "123456",
    });

    const res = await request(app)
      .post("/login")
      .send({ username: "test", password: "test" });

    expect(res.status).toBe(401);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Incorrect Password" }),
      ]),
    );
  });

  it("logins the user", async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);
    vi.spyOn(usersQuery, "getUserByUsername").mockResolvedValue({
      username: "test",
      password: hashedPassword,
    });

    const res = await request(app)
      .post("/login")
      .send({ username: "test", password: "123456" });

    expect(res.status).toBe(200);
  });
});
