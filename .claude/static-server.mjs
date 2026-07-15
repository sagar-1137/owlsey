import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT || 4321);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    let filePath = path.join(root, urlPath);
    // Try as-is, else append .html (Next static export uses /contact → /contact.html)
    try {
      await fs.access(filePath);
    } catch {
      try {
        await fs.access(filePath + ".html");
        filePath += ".html";
      } catch {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader("Content-Type", types[ext] || "application/octet-stream");
    res.setHeader("Cache-Control", "no-store");
    const data = await fs.readFile(filePath);
    res.end(data);
  } catch (err) {
    res.statusCode = 500;
    res.end(String(err));
  }
});

server.listen(port, () => {
  console.log(`Static server listening on http://localhost:${port}`);
});
