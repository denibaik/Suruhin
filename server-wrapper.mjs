/**
 * server-wrapper.mjs
 * Node.js HTTP server yang membungkus Cloudflare Worker handler
 * dari output build Lovable/Vite.
 */
import { createServer } from "node:http";

// Import handler yang di-build oleh Lovable config (Cloudflare Worker format)
const { default: workerHandler } = await import("./dist/server/server.js");

const PORT = parseInt(process.env.PORT || "8080", 10);
const HOST = process.env.HOST || "0.0.0.0";

const server = createServer(async (nodeReq, nodeRes) => {
  try {
    // Buat Web API Request dari Node.js request
    const protocol = nodeReq.headers["x-forwarded-proto"] || "http";
    const host = nodeReq.headers.host || `localhost:${PORT}`;
    const url = `${protocol}://${host}${nodeReq.url}`;

    const headers = new Headers();
    for (const [key, val] of Object.entries(nodeReq.headers)) {
      if (val != null) {
        headers.set(key, Array.isArray(val) ? val.join(", ") : val);
      }
    }

    const methodHasBody = !["GET", "HEAD", "OPTIONS"].includes(
      nodeReq.method || "GET"
    );
    let body = undefined;
    if (methodHasBody) {
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        nodeReq.on("data", (c) => chunks.push(c));
        nodeReq.on("end", () =>
          resolve(chunks.length ? Buffer.concat(chunks) : null)
        );
        nodeReq.on("error", reject);
      });
    }

    const webRequest = new Request(url, {
      method: nodeReq.method || "GET",
      headers,
      body: body && body.length ? body : undefined,
    });

    // Panggil Cloudflare Worker handler
    const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
    const webResponse = await workerHandler.fetch(webRequest, {}, ctx);

    // Kirim response ke Node.js
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
});

process.on("SIGTERM", () => server.close());
process.on("SIGINT", () => server.close());
