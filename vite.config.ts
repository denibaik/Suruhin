import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/vite";

// Konfigurasi untuk deployment Node.js (Azure App Service)
// Jalankan: NITRO_PRESET=node-server bun run build
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: {
        entry: "server",
      },
    }),
    react(),
  ],
});
