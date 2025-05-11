import app from './app/app'
import config from "./util/config";

Bun.serve({
  fetch: app.fetch,
  port: config.port,
})

console.log('✅ API running at http://localhost:3000')
