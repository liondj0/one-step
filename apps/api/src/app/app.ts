import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello from One Step API 🚀'))
app.get('/groups', (c) => c.json([{ id: 1, name: 'Demo Group' }]))

export default app
