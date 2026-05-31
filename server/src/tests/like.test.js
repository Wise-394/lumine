import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";

describe("likes", () => {
  it("likes user post");
  it("dislike user post");
  it("prevents liking when not authorized");
  it("it prevent disliking if not liked");
});
