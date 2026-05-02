const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.errors?.[0]?.msg || data.message || "Something went wrong",
      );
    }
    return data;
  } catch {
    throw new Error("Unable to connect to the server, Try again later");
  }
}
