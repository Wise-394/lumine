import { desribe, it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router";
import { apiFetch } from "../helpers/api.js";
import { usePostStore } from "../store/PostStore.jsx";
describe("delete post", () => {
  it("deletes user post");
  it("redirect if not authenticated");
  it("redirect if no id");
  it("shows error when backend isnt online", () => {});
  it("shows error when cannot delete post");
});
