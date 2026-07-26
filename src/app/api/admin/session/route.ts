import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { rejectUnlessAdminHost } from "@/lib/admin-host";

export async function GET(req: Request) {
  const blocked = rejectUnlessAdminHost(req);
  if (blocked) return blocked;

  const ok = await isAdminRequest();
  return NextResponse.json({ ok });
}
