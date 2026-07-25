import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  repo: string;
  repoPrivate: boolean;
  appStore: string;
  sites: string[];
  stack: string[];
  order: number;
  gradient: string;
};

export type ProjectInput = {
  title: string;
  category: string;
  description: string;
  repo: string;
  repoPrivate: boolean;
  appStore: string;
  sites: string[];
  stack: string[];
  gradient?: string;
};

const DATA_PATH = path.join(process.cwd(), "data", "projects.json");

const GRADIENTS = [
  "from-amber-600/25 to-orange-700/10",
  "from-rose-600/20 to-fuchsia-700/10",
  "from-violet-600/20 to-indigo-700/10",
  "from-cyan-600/20 to-blue-700/10",
  "from-emerald-600/20 to-teal-700/10",
];

function normalizeUrl(url: string) {
  const s = url.trim();
  if (!s) return "";
  return s.startsWith("http") ? s : `https://${s}`;
}

function normalizeSites(sites: unknown): string[] {
  if (!Array.isArray(sites)) return [];
  return sites
    .map((s) => normalizeUrl(String(s)))
    .filter(Boolean);
}

function normalizeStack(stack: unknown): string[] {
  if (!Array.isArray(stack)) return [];
  return stack.map((s) => String(s).trim()).filter(Boolean);
}

function normalizeProject(p: Partial<Project>): Project {
  return {
    id: p.id || randomUUID(),
    title: p.title || "",
    category: p.category || "",
    description: p.description || "",
    repo: p.repo || "",
    repoPrivate: Boolean(p.repoPrivate),
    appStore: p.appStore || "",
    sites: normalizeSites(p.sites),
    stack: normalizeStack(p.stack),
    order: typeof p.order === "number" ? p.order : 0,
    gradient: p.gradient || GRADIENTS[0],
  };
}

export async function readProjects(): Promise<Project[]> {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  const list = JSON.parse(raw) as Partial<Project>[];
  return list.map(normalizeProject).sort((a, b) => a.order - b.order);
}

async function writeProjects(projects: Project[]) {
  const sorted = [...projects]
    .sort((a, b) => a.order - b.order)
    .map((p, i) => ({ ...p, order: i }));
  await fs.writeFile(DATA_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8");
  return sorted;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const projects = await readProjects();
  const project: Project = {
    id: randomUUID(),
    title: input.title.trim(),
    category: input.category.trim(),
    description: input.description.trim(),
    repo: input.repo.trim(),
    repoPrivate: Boolean(input.repoPrivate),
    appStore: normalizeUrl(input.appStore || ""),
    sites: normalizeSites(input.sites),
    stack: normalizeStack(input.stack),
    order: projects.length,
    gradient: input.gradient?.trim() || GRADIENTS[projects.length % GRADIENTS.length],
  };
  projects.push(project);
  await writeProjects(projects);
  return project;
}

export async function updateProject(
  id: string,
  input: Partial<ProjectInput>
): Promise<Project | null> {
  const projects = await readProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const current = projects[idx];
  projects[idx] = {
    ...current,
    title: input.title?.trim() ?? current.title,
    category: input.category?.trim() ?? current.category,
    description: input.description?.trim() ?? current.description,
    repo: input.repo?.trim() ?? current.repo,
    repoPrivate:
      typeof input.repoPrivate === "boolean"
        ? input.repoPrivate
        : current.repoPrivate,
    appStore:
      input.appStore !== undefined
        ? normalizeUrl(input.appStore)
        : current.appStore,
    sites: input.sites ? normalizeSites(input.sites) : current.sites,
    stack: input.stack ? normalizeStack(input.stack) : current.stack,
    gradient: input.gradient?.trim() || current.gradient,
  };

  await writeProjects(projects);
  return projects[idx];
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await readProjects();
  const next = projects.filter((p) => p.id !== id);
  if (next.length === projects.length) return false;
  await writeProjects(next);
  return true;
}

export async function reorderProjects(ids: string[]): Promise<Project[]> {
  const projects = await readProjects();
  const map = new Map(projects.map((p) => [p.id, p]));
  const ordered: Project[] = [];

  for (const id of ids) {
    const p = map.get(id);
    if (p) {
      ordered.push(p);
      map.delete(id);
    }
  }
  for (const p of map.values()) ordered.push(p);

  return writeProjects(ordered);
}
