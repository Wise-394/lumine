import { desribe, it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { apiFetch } from "../helpers/api.js";
import { useNewPostStore } from "../store/newPostStore.jsx";

describe("user profile", () => {
  it("shows total post count");
  it("shows user name");
  it("doesn't show profile page when not authenticated");
  it("shows no posts when there's no post");
  it("shows all the post of user");
});
