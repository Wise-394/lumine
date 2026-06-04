import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostCard } from "../components/PostCard.jsx";
import { MemoryRouter } from "react-router";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";

vi.mock("../helpers/api.js", () => ({ apiFetch: vi.fn() }));
vi.mock("../helpers/localStorage.js", () => ({ getJWT: () => null }));
vi.mock("../store/authenticationStore.jsx", () => ({
  useAuthenticationStore: vi.fn((selector) =>
    selector({ user: null, userId: null, isLoggedIn: false, isGuest: false }),
  ),
}));

const toggleDialog = vi.fn();
vi.mock("../store/dialogStore.jsx", () => ({
  useDialogStore: vi.fn((selector) =>
    selector({ isDialogOpen: false, toggleDialog }),
  ),
}));

const BASE_PROPS = {
  username: "alice",
  postTitle: "My Post",
  postUserId: "user-1",
  codeTitle: "index.js",
  language: "javascript",
  code: 'console.log("hi")',
  tags: [],
  createdAt: "2024-01-01",
  postId: "post-abc",
  setPosts: vi.fn(),
  likesCount: 0,
  likedByUser: false,
};

function renderCard(props = {}) {
  return render(
    <MemoryRouter>
      <PostCard {...BASE_PROPS} {...props} />
    </MemoryRouter>,
  );
}

describe("GuestPopUp via PostCard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls toggleDialog when a guest clicks the like button", async () => {
    renderCard();

    await userEvent.click(screen.getByRole("button", { name: /like post/i }));

    expect(toggleDialog).toHaveBeenCalledTimes(1);
  });

  it("does not call toggleDialog if the user is logged in", async () => {
    useAuthenticationStore.mockImplementationOnce((selector) =>
      selector({
        user: { id: "user-1" },
        userId: "user-1",
        isLoggedIn: true,
        isGuest: false,
      }),
    );

    renderCard();

    await userEvent.click(screen.getByRole("button", { name: /like post/i }));

    expect(toggleDialog).not.toHaveBeenCalled();
  });
});
