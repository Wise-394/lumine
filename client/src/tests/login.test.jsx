import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../pages/Login.jsx";
import { MemoryRouter } from "react-router";
import { apiFetch } from "../helpers/api.js";
import { setJWT } from "../helpers/localStorage.js";

vi.mock("../helpers/api.js");
vi.mock("../helpers/jwt.js");

describe("user login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("says Username or password cannot be empty", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const submit = screen.getByRole("button", { name: "Login" });

    await user.click(submit);
    expect(screen.getByTestId("errorMsg")).toHaveTextContent(
      "Username or password cannot be empty",
    );
  });

  it("handles incorrect credentials or user doesnt exist", async () => {
    vi.mocked(apiFetch).mockRejectedValue(new Error("Incorrect password"));
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const username = screen.getByRole("textbox", { name: /username/i });
    const password = screen.getByLabelText("Password");
    const submit = screen.getByRole("button", { name: /login/i });

    await user.type(username, "test");
    await user.type(password, "test1234");
    await user.click(submit);

    expect(screen.getByTestId("errorMsg")).toHaveTextContent(
      "Incorrect password",
    );
  });

  it("logins user successfully", async () => {
    vi.mocked(apiFetch).mockResolvedValue({ token: "fake-jwt-token" });
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const username = screen.getByRole("textbox", { name: /username/i });
    const password = screen.getByLabelText("Password");
    const submit = screen.getByRole("button", { name: /login/i });

    await user.type(username, "testuser");
    await user.type(password, "password123");
    await user.click(submit);

    expect(setJWT).toHaveBeenCalledWith("fake-jwt-token");
    expect(username).toHaveValue("");
    expect(password).toHaveValue("");
  });
});
