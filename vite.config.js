import { defineConfig } from "vite";

// WarungAI is a plain Vite + vanilla JS app.
// No framework plugins are needed; Firebase is loaded from npm.
export default defineConfig({
  server: {
    host: "localhost",
    port: 5173,
  },
});
