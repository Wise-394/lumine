import { loadEnv } from "vite";

export function setup() {
  process.env = { ...process.env, ...loadEnv("", process.cwd(), "") };
}
