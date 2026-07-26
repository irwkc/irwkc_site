import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_HOST = "irwkc.irwkc.ru";

function requestHost(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-host");
  const raw = (forwarded?.split(",")[0] || request.headers.get("host") || "")
    .trim()
    .toLowerCase();
  return raw.split(":")[0];
}

function isLocalDevHost(host: string) {
  return (
    process.env.NODE_ENV !== "production" &&
    (host === "localhost" || host === "127.0.0.1")
  );
}

function notFound() {
  return new NextResponse(null, { status: 404 });
}

export function proxy(request: NextRequest) {
  const host = requestHost(request);
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const onAdminHost = host === ADMIN_HOST;
  const onLocalDev = isLocalDevHost(host);

  if (onAdminHost) {
    if (
      pathname.startsWith("/api/") ||
      pathname === "/admin" ||
      pathname.startsWith("/admin/")
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(`https://${ADMIN_HOST}/admin`);
  }

  // Main site / IP / anything else: admin is unreachable here
  if (!onLocalDev) {
    if (
      pathname === "/admin" ||
      pathname.startsWith("/admin/") ||
      pathname.startsWith("/api/admin")
    ) {
      return notFound();
    }

    // Project writes only from admin host
    if (
      pathname.startsWith("/api/projects") &&
      method !== "GET" &&
      method !== "HEAD"
    ) {
      return notFound();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
