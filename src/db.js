const Database = require('better-sqlite3')

const db = new Database('telemetry.db')

// создаём таблицу
db.prepare(`
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_type TEXT,
  graph_mode TEXT,
  graph_calls INTEGER,
  tokens_in INTEGER,
  tokens_out INTEGER,
  duration_ms INTEGER,
  rating INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run()

module.exports = db