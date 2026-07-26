import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { rejectUnlessAdminHost } from "@/lib/admin-host";
import { createProject, readProjects, type ProjectInput } from "@/lib/projects";

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const blocked = rejectUnlessAdminHost(req);
  if (blocked) return blocked;

  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as Partial<ProjectInput>;
  if (!body.title?.trim() || !body.category?.trim()) {
    return NextResponse.json(
      { error: "title and category are required" },
      { status: 400 }
    );
  }

  const project = await createProject({
    title: body.title,
    category: body.category,
    description: body.description || "",
    repo: body.repo || "",
    repoPrivate: Boolean(body.repoPrivate),
    appStore: body.appStore || "",
    sites: body.sites || [],
    stack: body.stack || [],
    gradient: body.gradient,
  });

  return NextResponse.json(project, { status: 201 });
}
