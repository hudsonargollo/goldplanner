import { useEffect, useState } from "react";
import { ArrowLeft, ScrollText, Rocket, Wrench, AlertTriangle, StickyNote, Plus, Trash2, ListPlus } from "lucide-react";
import { api } from "@/lib/api";
import { Avatar, Spinner } from "@/components/ui";

// Hudson-only changelog feed for internal side projects (quiz-funnel,
// fabrica-de-conteudo, etc.) — distinct from the CRM Comercial module, which
// tracks paying-client engagements. Anyone on staff can read; only
// DEV_LOG_ALLOWED_EMAIL can write, mirroring functions/api/dev-logs's own
// server-side gate (this is UI hiding only, not the real enforcement).
const DEV_LOG_ALLOWED_EMAIL = "hudsonargollo2@gmail.com";

const KIND_META = {
  note: { icon: StickyNote, label: "nota", color: "text-stone-500 bg-ink/[0.05]" },
  milestone: { icon: Rocket, label: "marco", color: "text-success bg-success/15" },
  fix: { icon: Wrench, label: "correção", color: "text-action bg-action/15" },
  known_issue: { icon: AlertTriangle, label: "problema conhecido", color: "text-warning bg-warning/15" },
};

function relTime(iso) {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "agora";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

function LogEntry({ log, isOwner, onDelete, onPromote }) {
  const meta = KIND_META[log.kind] || KIND_META.note;
  const Icon = meta.icon;
  const [taskDraft, setTaskDraft] = useState("");
  const [showPromote, setShowPromote] = useState(false);
  const [busy, setBusy] = useState(false);

  const submitTask = async () => {
    const title = taskDraft.trim();
    if (!title || busy) return;
    setBusy(true);
    try {
      await onPromote(log.id, title);
      setTaskDraft("");
      setShowPromote(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="group/log rounded-lg border border-ink/10 bg-ink/[0.02] p-3">
      <div className="mb-1 flex items-center gap-2">
        <Avatar name="Hudson Argollo" />
        <span className="text-xs font-semibold text-ink">Hudson Argollo</span>
        <span
          className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider ${meta.color}`}
        >
          <Icon size={9} /> {meta.label}
        </span>
        <span className="ml-auto font-mono text-[10px] text-stone-400">{relTime(log.created_at)}</span>
        {isOwner && (
          <button
            onClick={() => onDelete(log.id)}
            className="rounded p-0.5 text-stone-300 opacity-0 transition-all hover:text-danger group-hover/log:opacity-100"
            title="Excluir"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>
      {log.title && <p className="mb-0.5 text-sm font-semibold text-ink">{log.title}</p>}
      <p className="whitespace-pre-wrap text-sm text-stone-700">{log.body}</p>

      {log.taskIds?.length > 0 && (
        <p className="mt-1.5 font-mono text-[10px] text-success">→ {log.taskIds.length} tarefa{log.taskIds.length > 1 ? "s" : ""} criada{log.taskIds.length > 1 ? "s" : ""} no board</p>
      )}

      {isOwner && (
        <div className="mt-2">
          {showPromote ? (
            <div className="flex gap-1.5">
              <input
                autoFocus
                value={taskDraft}
                onChange={(e) => setTaskDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitTask()}
                placeholder="Título da tarefa"
                className="flex-1 rounded-md border border-ink/15 bg-transparent px-2 py-1 text-xs text-ink outline-none focus:border-action"
              />
              <button
                onClick={submitTask}
                disabled={busy}
                className="rounded-md bg-clay px-2 py-1 text-[11px] font-semibold text-ink disabled:opacity-50"
              >
                Criar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowPromote(true)}
              className="inline-flex items-center gap-1 font-mono text-[10px] text-stone-400 hover:text-action"
            >
              <ListPlus size={11} /> criar tarefa no board
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function DevLogsPanel({ clients, userEmail, onClose }) {
  const [projectId, setProjectId] = useState(clients[0]?.id ?? "");
  const [logs, setLogs] = useState(null);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState({ title: "", body: "", kind: "note" });
  const [busy, setBusy] = useState(false);

  const isOwner = userEmail === DEV_LOG_ALLOWED_EMAIL;

  function load() {
    if (!projectId) return;
    setLogs(null);
    api.listDevLogs(projectId).then(({ logs }) => setLogs(logs)).catch(() => setLogs([]));
  }
  useEffect(load, [projectId]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function submit() {
    if (!draft.body.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      await api.createDevLog({ projectId, ...draft });
      setDraft({ title: "", body: "", kind: "note" });
      load();
    } catch (e) {
      setError(e.body?.error || "Falha ao salvar.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    await api.deleteDevLog(id);
    load();
  }

  async function promote(logId, title) {
    await api.promoteDevLogTask(logId, { title });
    load();
  }

  return (
    <div className="flex h-full w-full flex-col surface-2">
      <div className="flex items-center justify-between border-b border-ink/15 px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="-ml-1.5 rounded-lg p-1.5 text-stone-500 hover:bg-ink/[0.05] hover:text-ink lg:hidden"
          >
            <ArrowLeft size={16} />
          </button>
          <ScrollText size={15} className="text-action" />
          <span className="label-tech">Project Logs</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-6 py-5">
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="mb-4 w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-action"
        >
          {clients.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {error && (
          <p className="mb-3 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 font-mono text-[11px] text-danger">
            {error}
          </p>
        )}

        {isOwner && (
          <div className="mb-4 rounded-lg border border-ink/15 bg-ink/[0.02] p-3">
            <input
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              placeholder="Título (opcional)"
              className="mb-2 w-full rounded-md border border-ink/15 bg-transparent px-2.5 py-1.5 text-sm text-ink outline-none focus:border-action"
            />
            <textarea
              value={draft.body}
              onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
              placeholder="O que aconteceu neste projeto..."
              rows={3}
              className="mb-2 w-full resize-none rounded-md border border-ink/15 bg-transparent px-2.5 py-1.5 text-sm text-ink outline-none focus:border-action"
            />
            <div className="flex items-center gap-2">
              <div className="flex gap-1 rounded-lg surface-3 p-1">
                {Object.entries(KIND_META).map(([k, m]) => (
                  <button
                    key={k}
                    onClick={() => setDraft((d) => ({ ...d, kind: k }))}
                    className={`rounded-md px-2 py-1 font-mono text-[10px] transition-colors ${
                      draft.kind === k ? "bg-clay text-ink shadow-sm" : "text-stone-500 hover:text-ink"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <button
                onClick={submit}
                disabled={busy || !draft.body.trim()}
                className="ml-auto inline-flex items-center gap-1 rounded-md bg-clay px-3 py-1.5 text-xs font-semibold text-ink disabled:opacity-50"
              >
                <Plus size={13} /> Publicar
              </button>
            </div>
          </div>
        )}

        {logs === null ? (
          <div className="flex justify-center py-10"><Spinner /></div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-ink/10 py-10 text-center">
            <ScrollText size={18} className="text-stone-300" />
            <p className="text-xs text-stone-500">Nenhum log ainda para este projeto.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <LogEntry key={log.id} log={log} isOwner={isOwner} onDelete={remove} onPromote={promote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
