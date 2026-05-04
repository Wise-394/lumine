import { describe, it, expect, beforeEach, vi } from "vitest";
import { apiFetch } from "../helpers/api.js";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

describe("apiFetch", () => {
  it("throws unable to connect when backend is offline", async () => {
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    await expect(apiFetch("/test")).rejects.toThrow(
      "Unable to connect to the server, Try again later",
    );
  });

  it("says error when backend response isn't ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        errors: [{ msg: "backend responded with not ok" }],
      }),
    });

    await expect(apiFetch("/test")).rejects.toThrow(
      "backend responded with not ok",
    );
  });

  it("says error when backend response isn't ok with no message", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({}),
    });

    await expect(apiFetch("/test")).rejects.toThrow("Something went wrong");
  });
});
