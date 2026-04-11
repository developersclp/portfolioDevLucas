import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/**
 * Middleware to protect /admin/* routes (except /admin/login)
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow /admin/login to pass through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check for session cookie
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Verify JWT
  try {
    const secretKey = process.env.SESSION_SECRET!;
    const encodedKey = new TextEncoder().encode(secretKey);
    await jwtVerify(session, encodedKey, { algorithms: ["HS256"] });
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
