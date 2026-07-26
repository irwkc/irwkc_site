import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-auth";
import { rejectUnlessAdminHost } from "@/lib/admin-host";

export async function POST(req: Request) {
  const blocked = rejectUnlessAdminHost(req);
  if (blocked) return blocked;

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}
