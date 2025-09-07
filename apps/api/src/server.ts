import app from "./app/app";

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("✅ API running at http://localhost:3000");
