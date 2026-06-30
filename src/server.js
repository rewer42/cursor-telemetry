const fastify = require('fastify')({ logger: true })
const db = require('./db')

// POST telemetry
fastify.post('/telemetry', async (req, reply) => {
    const {
        task_type,
        graph_mode,
        graph_calls,
        tokens_in,
        tokens_out,
        duration_ms,
        rating
    } = req.body

    db.prepare(`
    INSERT INTO sessions
    (task_type, graph_mode, graph_calls, tokens_in, tokens_out, duration_ms, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
        task_type,
        graph_mode,
        graph_calls,
        tokens_in,
        tokens_out,
        duration_ms,
        rating
    )

    return { ok: true }
})

// простой stats
fastify.get('/stats', async () => {
    const row = db.prepare(`
    SELECT
      COUNT(*) as sessions,
      AVG(tokens_in) as avg_tokens_in,
      AVG(tokens_out) as avg_tokens_out,
      AVG(graph_calls) as avg_graph_calls,
      AVG(rating) as avg_rating
    FROM sessions
  `).get()

    return row
})

fastify.get('/health', async () => {
    return {
        status: 'ok!',
        time: new Date().toISOString(),
    }
})

fastify.listen({ port: 3000, host: '0.0.0.0' })