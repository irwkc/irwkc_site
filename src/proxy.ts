import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_HOST = "irwkc.irwkc.ru";
const SITE_HOSTS = new Set(["irwkc.ru", "www.irwkc.ru"]);

function requestHost(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-host");
  const raw = (forwarded?.split(",")[0] || request.headers.get("host") || "")
    .trim()
    .toLowerCase();
  return raw.split(":")[0];
}

export function proxy(request: NextRequest) {
  const host = requestHost(request);
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (host === ADMIN_HOST) {
    if (
      pathname.startsWith("/api/") ||
      pathname === "/admin" ||
      pathname.startsWith("/admin/")
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(`https://${ADMIN_HOST}/admin`);
  }

  if (SITE_HOSTS.has(host)) {
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      return NextResponse.redirect(`https://${ADMIN_HOST}/admin`);
    }
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.redirect(
        `https://${ADMIN_HOST}${pathname}${request.nextUrl.search}`
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
