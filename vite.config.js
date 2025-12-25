import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { open: true, port: 80 },
  css: { devSourcemap: true },
  preview: {
    port: 80,
  },
});
