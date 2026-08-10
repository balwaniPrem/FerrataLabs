import { NextResponse, type NextRequest } from "next/server";

/**
 * Subdomain routing for the unlisted product. CLAUDE.md §12.
 *
 * pledge.ferratalabs.ai/*  ->  /pledge/*
 *
 * The path /pledge also resolves directly on the apex, which is what makes the
 * dashboard testable locally. That is deliberate: it is unlisted, not secret. If it
 * ever needs to be genuinely restricted, that is auth, not routing.
 */
const PRODUCTS = ["pledge"] as const;

export function proxy(req: NextRequest) {
  const host = req.headers.get("host")?.split(":")[0] ?? "";
  const sub = host.split(".")[0];

  if ((PRODUCTS as readonly string[]).includes(sub)) {
    const url = req.nextUrl.clone();
    if (!url.pathname.startsWith(`/${sub}`)) {
      url.pathname = `/${sub}${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png).*)"],
};
