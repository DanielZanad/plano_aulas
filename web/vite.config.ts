import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.SUPABASE_URL": JSON.stringify(process.env.SUPABASE_URL),
    "process.env.SUPABASE_KEY": JSON.stringify(process.env.SUPABASE_KEY),
  },
});
