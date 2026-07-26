export const ADMIN_HOST = "irwkc.irwkc.ru";

export function getRequestHost(request: Request) {
  const forwarded = request.headers.get("x-forwarded-host");
  const raw = (forwarded?.split(",")[0] || request.headers.get("host") || "")
    .trim()
    .toLowerCase();
  return raw.split(":")[0];
}

/** Admin UI/API are only allowed on the admin subdomain (or localhost in dev). */
export function isAdminHost(request: Request) {
  const host = getRequestHost(request);
  if (host === ADMIN_HOST) return true;
  if (process.env.NODE_ENV !== "production") {
    return host === "localhost" || host === "127.0.0.1";
  }
  return false;
}

export function rejectUnlessAdminHost(request: Request) {
  if (isAdminHost(request)) return null;
  return new Response(null, { status: 404 });
}
