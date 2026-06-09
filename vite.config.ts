import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// NITRO_PRESET=node-server sudah di-set di Dockerfile (ENV),
// sehingga target build otomatis Node.js bukan Cloudflare.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
