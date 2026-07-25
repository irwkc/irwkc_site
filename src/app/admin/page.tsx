"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  LogOut,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import type { Project } from "@/lib/projects";

type Draft = {
  title: string;
  category: string;
  description: string;
  repo: string;
  repoPrivate: boolean;
  appStore: string;
  sitesText: string;
  stackText: string;
};

function toDraft(p?: Partial<Project>): Draft {
  return {
    title: p?.title || "",
    category: p?.category || "",
    description: p?.description || "",
    repo: p?.repo || "",
    repoPrivate: Boolean(p?.repoPrivate),
    appStore: p?.appStore || "",
    sitesText: (p?.sites || []).join("\n"),
    stackText: (p?.stack || []).join(", "),
  };
}

function fromDraft(d: Draft) {
  return {
    title: d.title,
    category: d.category,
    description: d.description,
    repo: d.repo,
    repoPrivate: d.repoPrivate,
    appStore: d.appStore,
    sites: d.sitesText
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean),
    stack: d.stackText
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(toDraft());
  const [saving, setSaving] = useState(false);

  const loadProjects = useCallback(async () => {
    const res = await fetch("/api/projects", { cache: "no-store" });
    const data = (await res.json()) as Project[];
    setProjects(data);
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/session");
      const data = (await res.json()) as { ok: boolean };
      setAuthed(data.ok);
      if (data.ok) await loadProjects();
    })();
  }, [loadProjects]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Неверный пароль");
      return;
    }
    setAuthed(true);
    setPassword("");
    await loadProjects();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setEditingId(null);
  };

  const startCreate = () => {
    setEditingId("new");
    setDraft(toDraft());
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setDraft(toDraft(p));
  };

  const save = async () => {
    if (!draft.title.trim() || !draft.category.trim()) {
      setError("Название и категория обязательны");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const body = fromDraft(draft);
      if (editingId === "new") {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("fail");
      } else if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("fail");
      }
      setEditingId(null);
      await loadProjects();
    } catch {
      setError("Не удалось сохранить");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить проект?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (editingId === id) setEditingId(null);
      await loadProjects();
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const next = [...projects];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setProjects(next);
    await fetch("/api/projects/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: next.map((p) => p.id) }),
    });
  };

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-muted">
        Загрузка…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] px-4 text-foreground">
        <form
          onSubmit={login}
          className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h1 className="text-xl font-semibold">Админка</h1>
          <p className="text-sm text-muted">Только управление проектами</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-accent/50"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-cream py-3 text-sm font-semibold text-[#0f172a]"
          >
            Войти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] px-4 py-8 text-foreground md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Проекты</h1>
            <p className="text-sm text-muted">Добавление, редактирование, порядок</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={startCreate}
              className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-[#0f172a]"
            >
              <Plus className="h-4 w-4" />
              Новый
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"
            >
              <LogOut className="h-4 w-4" />
              Выйти
            </button>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        {editingId && (
          <div className="mb-8 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">
              {editingId === "new" ? "Новый проект" : "Редактирование"}
            </h2>
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="Название"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-accent/50"
            />
            <input
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              placeholder="Категория"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-accent/50"
            />
            <textarea
              value={draft.description}
              onChange={(e) =>
                setDraft({ ...draft, description: e.target.value })
              }
              placeholder="Описание"
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-accent/50"
            />
            <input
              value={draft.repo}
              onChange={(e) => setDraft({ ...draft, repo: e.target.value })}
              placeholder="GitHub repo URL (необязательно)"
              disabled={draft.repoPrivate}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-accent/50 disabled:opacity-40"
            />
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={draft.repoPrivate}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    repoPrivate: e.target.checked,
                    repo: e.target.checked ? "" : draft.repo,
                  })
                }
                className="h-4 w-4 accent-indigo-400"
              />
              Репозиторий закрыт (не показывать GitHub)
            </label>
            <input
              value={draft.appStore}
              onChange={(e) => setDraft({ ...draft, appStore: e.target.value })}
              placeholder="App Store URL"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-accent/50"
            />
            <input
              value={draft.stackText}
              onChange={(e) => setDraft({ ...draft, stackText: e.target.value })}
              placeholder="Стек — через запятую: Next.js, React, TypeScript"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-accent/50"
            />
            <textarea
              value={draft.sitesText}
              onChange={(e) => setDraft({ ...draft, sitesText: e.target.value })}
              placeholder={"Сайты — каждый с новой строки\nverde-rzn.ru"}
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-accent/50"
            />
            <div className="flex gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={save}
                className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-[#0f172a] disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="rounded-full border border-white/15 px-4 py-2 text-sm"
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-col gap-1 pt-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="rounded-md border border-white/10 p-1.5 disabled:opacity-30"
                  aria-label="Выше"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === projects.length - 1}
                  className="rounded-md border border-white/10 p-1.5 disabled:opacity-30"
                  aria-label="Ниже"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-muted">{p.category}</p>
                <p className="mt-1 truncate text-xs text-muted/80">
                  {p.sites.join(" · ")}
                  {p.appStore ? " · App Store" : ""}
                  {p.repoPrivate ? " · private" : ""}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs"
                >
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  className="rounded-full border border-red-500/30 p-2 text-red-300"
                  aria-label="Удалить"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          <a href="/" className="underline underline-offset-4 hover:text-foreground">
            ← на сайт
          </a>
        </p>
      </div>
    </div>
  );
}
