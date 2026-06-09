# ================================
# Stage 1: Build
# ================================
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install

# Copy semua source code
COPY . .

# Build — NITRO_PRESET override Cloudflare default dari Lovable config
ENV NITRO_PRESET=node-server
RUN bun run build

# ================================
# Stage 2: Production
# ================================
FROM node:22-alpine AS runner
WORKDIR /app

# package.json diperlukan agar Node.js tahu ini ESM ("type": "module")
COPY --from=builder /app/package.json ./package.json
# Lovable config output ke dist/ bukan .output/
COPY --from=builder /app/dist ./dist
# Wrapper yang membungkus Cloudflare Worker handler jadi Node.js HTTP server
COPY --from=builder /app/server-wrapper.mjs ./server-wrapper.mjs

ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server-wrapper.mjs"]
