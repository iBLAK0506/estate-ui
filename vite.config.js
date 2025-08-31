import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        // This tells Vite to forward API requests to your backend server
        target: "http://localhost:4000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
