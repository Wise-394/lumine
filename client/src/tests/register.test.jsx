import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Register } from "../pages/Register.jsx";
import { MemoryRouter } from "react-router";
import { apiFetch } from "../helpers/api.js";

vi.mock("../helpers/api.js");

describe("User Registration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("says username or password cannot empty", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );
    const submit = screen.getByRole("button", { name: /Register/i });

    await user.click(submit);

    expect(screen.getByTestId("errorMsg")).toHaveTextContent(
      "Username or password cannot be empty",
    );
  });

  it("says password must be 8 characters or more", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    const username = screen.getByRole("textbox", { name: /username/i });
    const password = screen.getByLabelText("Password");
    const submit = screen.getByRole("button", { name: /Register/i });

    await user.type(username, "test");
    await user.type(password, "1");
    await user.click(submit);

    expect(screen.getByTestId("errorMsg")).toHaveTextContent(
      "Password must be 8 characters or more",
    );
  });

  it("says password doesn't match", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );
    const username = screen.getByRole("textbox", { name: /username/i });
    const password = screen.getByLabelText("Password");
    const repeatPassword = screen.getByLabelText("Repeat Password");
    const submit = screen.getByRole("button", { name: /Register/i });

    await user.type(username, "test");
    await user.type(password, "test12345");
    await user.type(repeatPassword, "test12345678");
    await user.click(submit);

    expect(screen.getByTestId("errorMsg")).toHaveTextContent(
      "Passwords doesn't match",
    );
  });

  it("shows username already exist", async () => {
    vi.mocked(apiFetch).mockRejectedValue(new Error("username already exist"));
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );
    const username = screen.getByRole("textbox", { name: /username/i });
    const password = screen.getByLabelText("Password");
    const repeatPassword = screen.getByLabelText("Repeat Password");
    const submit = screen.getByRole("button", { name: /Register/i });

    await user.type(username, "test");
    await user.type(password, "12345678");
    await user.type(repeatPassword, "12345678");
    await user.click(submit);

    expect(screen.getByTestId("errorMsg")).toHaveTextContent(
      "username already exist",
    );
  });

  //TODO: MOCK TEST IF API FAILED, if username already exist
  it("shows error when server isn't availablbe");
});
