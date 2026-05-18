import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewPost } from "../pages/NewPost.jsx";
import { MemoryRouter } from "react-router";
import { apiFetch } from "../helpers/api.js";
import { useNewPostStore } from "../store/newPostStore.jsx";

vi.mock("../helpers/api.js");
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => vi.fn() };
});
vi.mock("../components/NewPostForm.jsx", () => ({
  NewPostForm: () => <div data-testid="new-post-form" />,
}));
vi.mock("../components/CodeBlock.jsx", () => ({
  CodeBlock: () => <div data-testid="code-block" />,
}));

const renderNewPost = () =>
  render(
    <MemoryRouter>
      <NewPost />
    </MemoryRouter>,
  );

describe("New Post", () => {
  beforeEach(() => {
    useNewPostStore.setState({
      title: "",
      description: "",
      language: "Javascript",
      codeBlockTitle: "add.js",
      code: `function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(3, 5));`,
      codeBlockDescription:
        "The add function takes two numbers a and b and returns their sum.",
      loading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  it("shows error when validation isn't correct", async () => {
    useNewPostStore.setState({ title: "" });

    renderNewPost();

    const postButton = screen.getByRole("button", { name: /post/i });
    await userEvent.click(postButton);

    expect(
      await screen.findByText(/title must be at least 6 characters/i),
    ).toBeInTheDocument();

    expect(apiFetch).not.toHaveBeenCalled();
  });

  it("shows error when backend isn't online", async () => {
    useNewPostStore.setState({
      title: "My Valid Post Title",
      codeBlockTitle: "add.js",
      language: "Javascript",
      code: `function add(a, b) { return a + b; }`,
    });

    apiFetch.mockRejectedValueOnce(
      new Error("Unable to connect to the server, Try again later"),
    );

    renderNewPost();

    const postButton = screen.getByRole("button", { name: /post/i });
    await userEvent.click(postButton);

    expect(
      await screen.findByText(/unable to connect to the server/i),
    ).toBeInTheDocument();
  });
});

// TODO ADD MORE TEST WHEN SUCCESS
