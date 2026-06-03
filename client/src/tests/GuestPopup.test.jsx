import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostCard } from "../components/PostCard.jsx";
import { MemoryRouter } from "react-router";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";

vi.mock("../helpers/api.js", () => ({ apiFetch: vi.fn() }));
vi.mock("../helpers/localStorage.js", () => ({ getJWT: () => null }));
vi.mock("../store/authenticationStore.jsx", () => ({
  useAuthenticationStore: vi.fn(() => ({ user: null, userId: null })),
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
  setIsOpenDialog: vi.fn(),
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

  it("calls setIsOpenDialog when a guest clicks the like button", async () => {
    const setIsOpenDialog = vi.fn();
    renderCard({ setIsOpenDialog });

    await userEvent.click(screen.getByRole("button", { name: /like post/i }));

    expect(setIsOpenDialog).toHaveBeenCalledTimes(1);
  });

  it("does not call setIsOpenDialog if the user is logged in", async () => {
    useAuthenticationStore.mockReturnValueOnce({
      user: { id: "user-1" },
      userId: "user-1",
    });

    const setIsOpenDialog = vi.fn();
    renderCard({ setIsOpenDialog });

    await userEvent.click(screen.getByRole("button", { name: /like post/i }));

    expect(setIsOpenDialog).not.toHaveBeenCalled();
  });
});
