import { NextResponse } from "next/server";
import {
  adminCookieOptions,
  checkPassword,
  createAdminToken,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  const body = (await req.json()) as { password?: string };
  if (!body.password || !checkPassword(body.password)) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  const cookie = adminCookieOptions(createAdminToken());
  res.cookies.set(cookie);
  return res;
}
