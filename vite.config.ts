import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: { alias: { "@": resolve(__dirname, "src") } },
  preview: { host: "0.0.0.0", port: 3000, open: "http://localhost:3000" },
  server: { host: "0.0.0.0", port: 3000, open: "http://localhost:3000" },
  plugins: [vue(), tailwindcss()],
});
