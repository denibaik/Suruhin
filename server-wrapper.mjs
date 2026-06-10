/**
 * server-wrapper.mjs
 * Node.js HTTP server yang membungkus Cloudflare Worker handler.
 * Menyediakan mock ASSETS binding dan serve file statis dari dist/client/.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Coba beberapa lokasi kemungkinan file statis
const STATIC_DIRS = [
  resolve(__dirname, "dist", "client"),
  resolve(__dirname, "dist", "public"),
  resolve(__dirname, "dist"),
];

const MIME_TYPES = {
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".txt": "text/plain",
  ".xml": "text/xml",
};

// Serve file statis dari filesystem
async function tryServeStatic(pathname) {
  for (const dir of STATIC_DIRS) {
    const filePath = join(dir, pathname);
    if (!filePath.startsWith(dir)) continue; // cegah directory traversal
    if (existsSync(filePath)) {
      try {
        const content = await readFile(filePath);
        const ext = extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        return { content, contentType };
      } catch {
        continue;
      }
    }
  }
  return null;
}

// Mock ASSETS binding untuk Cloudflare Worker compatibility
const mockAssets = {
  async fetch(request) {
    const url = new URL(typeof request === "string" ? request : request.url);
    const result = await tryServeStatic(url.pathname);
    if (result) {
      return new Response(result.content, {
        status: 200,
        headers: {
          "content-type": result.contentType,
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    }
    return new Response("Not Found", { status: 404 });
  },
};

// Import Cloudflare Worker handler
const { default: workerHandler } = await import("./dist/server/server.js");

const PORT = parseInt(process.env.PORT || "8080", 10);
const HOST = process.env.HOST || "0.0.0.0";

const server = createServer(async (nodeReq, nodeRes) => {
  try {
    const pathname = nodeReq.url?.split("?")[0] || "/";

    // Coba serve file statis dulu (CSS, JS, gambar, dll)
    const ext = extname(pathname).toLowerCase();
    if (ext && ext !== ".html") {
      const staticFile = await tryServeStatic(pathname);
      if (staticFile) {
        nodeRes.writeHead(200, {
          "content-type": staticFile.contentType,
          "cache-control": "public, max-age=31536000, immutable",
          "content-length": staticFile.content.length,
        });
        nodeRes.end(staticFile.content);
        return;
      }
    }

    // Build Web API Request
    const protocol = nodeReq.headers["x-forwarded-proto"] || "http";
    const host = nodeReq.headers.host || `localhost:${PORT}`;
    const url = `${protocol}://${host}${nodeReq.url}`;

    const headers = new Headers();
    for (const [key, val] of Object.entries(nodeReq.headers)) {
      if (val != null) headers.set(key, Array.isArray(val) ? val.join(", ") : val);
    }

    const methodHasBody = !["GET", "HEAD", "OPTIONS"].includes(nodeReq.method || "GET");
    let body = undefined;
    if (methodHasBody) {
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        nodeReq.on("data", (c) => chunks.push(c));
        nodeReq.on("end", () => resolve(chunks.length ? Buffer.concat(chunks) : null));
        nodeReq.on("error", reject);
      });
    }

    const webRequest = new Request(url, {
      method: nodeReq.method || "GET",
      headers,
      body: body && body.length ? body : undefined,
    });

    // Panggil worker handler dengan mock ASSETS binding
    const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
    const env = { ASSETS: mockAssets };
    const webResponse = await workerHandler.fetch(webRequest, env, ctx);

    const resHeaders = {};
    webResponse.headers.forEach((val, key) => {
      resHeaders[key] = val;
    });
    nodeRes.writeHead(webResponse.status, resHeaders);

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        nodeRes.write(value);
      }
    }
    nodeRes.end();
  } catch (err) {
    console.error("[suruhin] Error:", err);
    nodeRes.writeHead(500, { "content-type": "text/plain" });
    nodeRes.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[suruhin] Server berjalan di http://${HOST}:${PORT}`);
  // Log lokasi static files untuk debugging
  for (const dir of STATIC_DIRS) {
    if (existsSync(dir)) console.log(`[suruhin] Static dir ditemukan: ${dir}`);
  }
});

process.on("SIGTERM", () => server.close());
process.on("SIGINT", () => server.close());
