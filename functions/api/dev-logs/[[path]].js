// Dev Project Logs — a changelog feed for internal side projects (quiz-funnel,
// fabrica-de-conteudo, etc.), distinct from the CRM `projects` table (which is
// paying-client post-sale delivery only — see functions/api/projects/[[path]].js
// and migrations/0002_hub_projects.sql). `projectId` here is a kanban:clients
// (KV) id, the same id space the real Kanban board already groups tasks by
// (migrations/0003_hub_tasks.sql's `tasks.project_id`).
//
// Read is open to any staff/admin (internal tool, no per-project membership
// concept applies the way it does for CRM `projects`). Write (create/edit/
// delete/promote-to-task) is restricted to one hardcoded email — same
// convention as worker/crm-entry.js's LEAD_DELETE_ALLOWED_EMAIL — since this
// is deliberately not a role anyone else gets promoted into.
//
//   GET    /api/dev-logs?projectId=X   — list logs for a project, newest first
//   POST   /api/dev-logs                — { projectId, title, body, kind } (hudson-only)
//   PATCH  /api/dev-logs/:id            — { title?, body?, kind? } (hudson-only)
//   DELETE /api/dev-logs/:id            — (hudson-only)
//   POST   /api/dev-logs/:id/tasks      — { title, description? } — creates a
//                                          real card on the Kanban board (hudson-only)
import { getSessionEmail } from "../../_lib/session.js";
import { getUserByEmail } from "../../_lib/db.js";
import { isStaffOrAdmin } from "../../_lib/rbac.js";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

const uid = () => crypto.randomUUID().replace(/-/g, "").slice(0, 12);

const DEV_LOG_ALLOWED_EMAIL = "hudsonargollo2@gmail.com";

export async function onRequest(context) {
  const { request, env, params } = context;
  const db = env.DB;
  if (!db) return json({ error: "D1 (DB) não vinculado." }, 500);

  const email = await getSessionEmail(request, env);
  const user = email ? await getUserByEmail(db, email) : null;
  if (!user || !isStaffOrAdmin(user)) return json({ error: "forbidden" }, 403);

  const seg = Array.isArray(params.path) ? params.path : [params.path].filter(Boolean);
  const [first, second, third] = seg;
  const method = request.method;
  const isOwner = email === DEV_LOG_ALLOWED_EMAIL;

  try {
    // ── POST /dev-logs/:id/tasks — promote to a real board card ────────────
    if (first && second === "tasks" && !third) {
      if (method !== "POST") return json({ error: "Not found" }, 404);
      if (!isOwner) return json({ error: "forbidden" }, 403);
      const log = await db.prepare("SELECT * FROM dev_project_logs WHERE id = ?").bind(first).first();
      if (!log) return json({ error: "Log not found" }, 404);
      const body = await request.json().catch(() => ({}));
      const title = String(body.title || "").trim();
      if (!title) return json({ error: "title obrigatório" }, 400);

      const maxRow = await db
        .prepare("SELECT COALESCE(MAX(order_index), -1) AS m FROM tasks WHERE project_id = ? AND column_id = 'todo'")
        .bind(log.project_id)
        .first();
      const orderIndex = Number(maxRow?.m ?? -1) + 1;
      const taskId = uid();
      await db
        .prepare(
          `INSERT INTO tasks (id, project_id, column_id, title, description, assignees, comments, extra, created_at)
           VALUES (?, ?, 'todo', ?, ?, '[]', '[]', ?, datetime('now'))`
        )
        .bind(taskId, log.project_id, title, body.description || null, JSON.stringify({ source: "dev_log", logId: log.id }))
        .run();
      await db
        .prepare("INSERT INTO dev_project_log_tasks (log_id, task_id) VALUES (?, ?)")
        .bind(log.id, taskId)
        .run();
      return json({ ok: true, taskId }, 201);
    }

    // ── PATCH/DELETE /dev-logs/:id — single log ─────────────────────────────
    if (first && !second && (method === "PATCH" || method === "DELETE")) {
      if (!isOwner) return json({ error: "forbidden" }, 403);
      const existing = await db.prepare("SELECT * FROM dev_project_logs WHERE id = ?").bind(first).first();
      if (!existing) return json({ error: "Log not found" }, 404);

      if (method === "DELETE") {
        await db.prepare("DELETE FROM dev_project_logs WHERE id = ?").bind(first).run();
        await db.prepare("DELETE FROM dev_project_log_tasks WHERE log_id = ?").bind(first).run();
        return json({ ok: true });
      }

      const body = await request.json().catch(() => ({}));
      const title = body.title !== undefined ? String(body.title) : existing.title;
      const logBody = body.body !== undefined ? String(body.body) : existing.body;
      const kind = ["note", "milestone", "fix", "known_issue"].includes(body.kind) ? body.kind : existing.kind;
      await db
        .prepare("UPDATE dev_project_logs SET title = ?, body = ?, kind = ?, updated_at = datetime('now') WHERE id = ?")
        .bind(title, logBody, kind, first)
        .run();
      const updated = await db.prepare("SELECT * FROM dev_project_logs WHERE id = ?").bind(first).first();
      return json({ log: updated });
    }

    // ── GET /dev-logs?projectId=X — list ─────────────────────────────────────
    if (!first) {
      if (method === "GET") {
        const projectId = new URL(request.url).searchParams.get("projectId");
        if (!projectId) return json({ error: "projectId obrigatório" }, 400);
        const { results: logs } = await db
          .prepare("SELECT * FROM dev_project_logs WHERE project_id = ? ORDER BY created_at DESC")
          .bind(projectId)
          .all();
        const { results: links } = await db
          .prepare(
            `SELECT log_id, task_id FROM dev_project_log_tasks
              WHERE log_id IN (${logs.map(() => "?").join(",") || "''"})`
          )
          .bind(...logs.map((l) => l.id))
          .all();
        const taskIdsByLog = new Map();
        for (const { log_id, task_id } of links) {
          if (!taskIdsByLog.has(log_id)) taskIdsByLog.set(log_id, []);
          taskIdsByLog.get(log_id).push(task_id);
        }
        return json({ logs: logs.map((l) => ({ ...l, taskIds: taskIdsByLog.get(l.id) || [] })) });
      }

      // ── POST /dev-logs — create ────────────────────────────────────────────
      if (method === "POST") {
        if (!isOwner) return json({ error: "forbidden" }, 403);
        const body = await request.json().catch(() => ({}));
        const projectId = String(body.projectId || "").trim();
        const logBody = String(body.body || "").trim();
        if (!projectId || !logBody) return json({ error: "projectId e body obrigatórios" }, 400);
        const kind = ["note", "milestone", "fix", "known_issue"].includes(body.kind) ? body.kind : "note";
        const id = uid();
        await db
          .prepare(
            `INSERT INTO dev_project_logs (id, project_id, author_email, title, body, kind)
             VALUES (?, ?, ?, ?, ?, ?)`
          )
          .bind(id, projectId, email, body.title || null, logBody, kind)
          .run();
        const log = await db.prepare("SELECT * FROM dev_project_logs WHERE id = ?").bind(id).first();
        return json({ log: { ...log, taskIds: [] } }, 201);
      }
    }

    return json({ error: "Not found" }, 404);
  } catch (e) {
    return json({ error: e.message ?? "Server error" }, 500);
  }
}
