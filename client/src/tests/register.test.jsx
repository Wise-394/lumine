import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Register } from "../pages/Register.jsx";

describe("User Registration", () => {
  it("says username or password cannot empty", async () => {
    const user = userEvent.setup();

    render(<Register />);
    const submit = screen.getByRole("button", { name: /Register/i });

    await user.click(submit);

    expect(screen.getByTestId("errorMsg")).toHaveTextContent(
      "Username or password cannot be empty",
    );
  });

  it("says password must be 8 characters or more", async () => {
    const user = userEvent.setup();

    render(<Register />);
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
});
