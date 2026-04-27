import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
    },
  },
});
