# ================================
# Stage 1: Build
# ================================
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Install dependencies terlebih dahulu (cache layer)
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Copy semua source code
COPY . .

# Build dengan target Node.js untuk deployment
ENV NITRO_PRESET=node-server
RUN bun run build

# ================================
# Stage 2: Production (lebih kecil)
# ================================
FROM node:22-alpine AS runner
WORKDIR /app

# Hanya copy hasil build
COPY --from=builder /app/.output ./.output

# Port yang digunakan Digital Ocean App Platform
ENV PORT=8080
EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
