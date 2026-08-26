-- Dev Project Logs: a Hudson-only changelog feed for internal side projects
-- (quiz-funnel, fabrica-de-conteudo, etc.), distinct from the CRM `projects`
-- table (which represents paying-client post-sale engagements only — see
-- migrations/0002_hub_projects.sql). `project_id` here is a kanban:clients
-- (KV) id, not a `projects` row — the same id space the task board already
-- groups work by, so no new project-registry table is needed.
CREATE TABLE IF NOT EXISTS dev_project_logs (
  id             TEXT PRIMARY KEY,
  project_id     TEXT NOT NULL,
  author_email   TEXT NOT NULL,
  title          TEXT,
  body           TEXT NOT NULL,
  kind           TEXT NOT NULL DEFAULT 'note',   -- note | milestone | fix | known_issue
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_dev_project_logs_project ON dev_project_logs(project_id, created_at DESC);

-- Tasks (in the real D1 `tasks` table, migrations/0003_hub_tasks.sql) that a
-- log entry spawned, so the feed can show "-> N tasks" and link into the board.
CREATE TABLE IF NOT EXISTS dev_project_log_tasks (
  log_id  TEXT NOT NULL,
  task_id TEXT NOT NULL,
  PRIMARY KEY (log_id, task_id)
);
