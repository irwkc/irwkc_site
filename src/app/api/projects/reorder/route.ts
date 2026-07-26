import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { rejectUnlessAdminHost } from "@/lib/admin-host";
import { reorderProjects } from "@/lib/projects";

export async function PUT(req: Request) {
  const blocked = rejectUnlessAdminHost(req);
  if (blocked) return blocked;

  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { ids?: string[] };
  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json({ error: "ids required" }, { status: 400 });
  }

  const projects = await reorderProjects(body.ids);
  return NextResponse.json(projects);
}
