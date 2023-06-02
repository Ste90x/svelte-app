import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    host: "127.0.0.1",
    port: 3000,
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  plugins: [svelte()],
});
