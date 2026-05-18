import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewPost } from "../pages/NewPost.jsx";
import { MemoryRouter } from "react-router";
import { apiFetch } from "../helpers/api.js";

vi.mock("../helpers/api.js");

describe("New Post", () => {
  it("shows error when validation isnt correct");
  it("shows error when backend isnt online");
});
