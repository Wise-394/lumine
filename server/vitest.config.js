import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: "./vitest.setup.js",
    envFile: ".env",
    server: {
      deps: {
        inline: ["jsonwebtoken"], //
      },
    },
  },
});
