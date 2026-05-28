import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostCard } from "../components/PostCard.jsx";
import { MemoryRouter } from "react-router";
import { apiFetch } from "../helpers/api.js";

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("../helpers/api.js", () => ({ apiFetch: vi.fn() }));
vi.mock("../helpers/localStorage.js", () => ({ getJWT: () => "test-token" }));
vi.mock("../store/authenticationStore.jsx", () => ({
  useAuthenticationStore: () => ({ userId: "user-1" }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router", async (importOriginal) => ({
  ...(await importOriginal()),
  useNavigate: () => mockNavigate,
}));

// ─── Shared helpers ───────────────────────────────────────────────────────────

const BASE_PROPS = {
  username: "alice",
  postTitle: "My Post",
  postUserId: "user-1", // matches mocked userId → menu is visible
  codeTitle: "index.js",
  language: "javascript",
  code: 'console.log("hi")',
  tags: [],
  createdAt: "2024-01-01",
  postId: "post-abc",
  setPosts: vi.fn(),
};

function renderCard(props = {}) {
  return render(
    <MemoryRouter>
      <PostCard {...BASE_PROPS} {...props} />
    </MemoryRouter>,
  );
}

async function openMenu() {
  await userEvent.click(screen.getByRole("button", { name: /more options/i }));
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("PostCard – delete post", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    apiFetch.mockResolvedValue({});
  });

  it("deletes the post and removes it from the list on success", async () => {
    const setPosts = vi.fn();
    const prevPosts = [{ postId: "post-abc" }, { postId: "post-xyz" }];
    apiFetch.mockResolvedValueOnce({});

    renderCard({ setPosts });
    await openMenu();
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() =>
      expect(apiFetch).toHaveBeenCalledWith("/post/post-abc", {
        method: "DELETE",
        headers: { Authorization: "Bearer test-token" },
      }),
    );

    // setPosts is called with a functional updater — invoke it to check the result
    await waitFor(() => expect(setPosts).toHaveBeenCalledTimes(1));
    const updater = setPosts.mock.calls[0][0];
    expect(updater(prevPosts)).toEqual([{ postId: "post-xyz" }]);
  });

  it("closes the menu after a successful delete", async () => {
    renderCard();
    await openMenu();

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: /delete/i }),
      ).not.toBeInTheDocument(),
    );
  });

  it("logs an error and keeps the post when the backend is offline", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    apiFetch.mockRejectedValueOnce(new Error("Network Error"));

    renderCard();
    await openMenu();
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() =>
      expect(consoleError).toHaveBeenCalledWith(
        "unable to delete post",
        expect.any(Error),
      ),
    );
    // setPosts should NOT have been called — post stays in the list
    expect(BASE_PROPS.setPosts).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it("logs an error and keeps the post when the API returns a failure", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    apiFetch.mockRejectedValueOnce(new Error("403 Forbidden"));

    renderCard();
    await openMenu();
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() =>
      expect(consoleError).toHaveBeenCalledWith(
        "unable to delete post",
        expect.any(Error),
      ),
    );
    expect(BASE_PROPS.setPosts).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });
});

describe("PostCard – menu visibility", () => {
  it("shows the ··· menu button when the logged-in user owns the post", () => {
    // BASE_PROPS has postUserId === mocked userId ("user-1")
    renderCard();
    expect(
      screen.getByRole("button", { name: /more options/i }),
    ).toBeInTheDocument();
  });

  it("hides the ··· menu button when the post belongs to a different user", () => {
    renderCard({ postUserId: "user-999" });
    expect(
      screen.queryByRole("button", { name: /more options/i }),
    ).not.toBeInTheDocument();
  });

  it("toggles the dropdown open and closed on repeated clicks", async () => {
    renderCard();
    const moreBtn = screen.getByRole("button", { name: /more options/i });

    // Open
    await userEvent.click(moreBtn);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();

    // Close
    await userEvent.click(moreBtn);
    expect(
      screen.queryByRole("button", { name: /delete/i }),
    ).not.toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside the menu", async () => {
    renderCard();
    await openMenu();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();

    await userEvent.click(document.body);

    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: /delete/i }),
      ).not.toBeInTheDocument(),
    );
  });
});

describe("PostCard – edit redirect", () => {
  it("navigates to the post detail page when Edit is clicked", async () => {
    renderCard();
    await openMenu();
    await userEvent.click(screen.getByRole("button", { name: /edit/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/post/post-abc");
  });
});
