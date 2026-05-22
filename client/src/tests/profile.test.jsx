import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { apiFetch } from "../helpers/api.js";
import { Profile } from "../pages/Profile.jsx";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";

vi.mock("../helpers/api.js");
vi.mock("../store/authenticationStore.jsx", () => ({
  useAuthenticationStore: vi.fn(),
}));

const mockPosts = {
  posts: [
    {
      postId: "1",
      username: "testuser",
      postTitle: "Test Post",
      postDescription: "A description",
      codeBlockTitle: "Example",
      language: "javascript",
      code: "console.log('hello')",
      codeBlockDescription: "Some code",
    },
    {
      postId: "2",
      username: "testuser2",
      postTitle: "Test Post 2",
      postDescription: "Another description",
      codeBlockTitle: "Example 2",
      language: "javascript",
      code: "console.log('world')",
      codeBlockDescription: "More code",
    },
  ],
};

const defaultAuthState = {
  isLoggedIn: true,
  isGuest: false,
  user: { sub: "123", username: "Test User" },
  userId: "123",
  login: vi.fn(),
  logout: vi.fn(),
  loginGuest: vi.fn(),
  logoutGuest: vi.fn(),
};

describe("user profile", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockResolvedValue(mockPosts);
    vi.mocked(useAuthenticationStore).mockReturnValue(defaultAuthState);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows total post count", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    const label = await screen.findByTestId("totalPost");
    expect(label).toHaveTextContent(2);
  });

  it("shows user name", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    const username = await screen.findByRole("heading", { level: 1 });
    expect(username).toHaveTextContent("Test User");
  });

  it("doesn't show profile page when not authenticated", async () => {
    vi.mocked(useAuthenticationStore).mockReturnValue({
      isLoggedIn: false,
      isGuest: false,
      user: null,
      userId: null,
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    expect(screen.getByText(/you're not logged in/i)).toBeInTheDocument();
  });

  it("shows no posts when there's no post", async () => {
    vi.mocked(apiFetch).mockResolvedValue({ posts: [] });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/no posts yet/i)).toBeInTheDocument();
  });

  it("shows all the post of user", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    const posts = await screen.findAllByTestId("postCard");
    expect(posts).toHaveLength(2);
  });
});
