import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../pages/Login.jsx";
import { MemoryRouter } from "react-router";
import { apiFetch } from "../helpers/api.js";

describe("user login", () => {
  it("says Username or password cannot be empty");

  it("handles incorrect credentials");

  it("handle user doesnt exist");

  it("handles clearing inputs");

  it("logins user succesfully");
});
