/**
 * Next.js middleware for route protection.
 * Note: Middleware can't access localStorage, so route protection
 * is handled client-side in the page components.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Since we use localStorage for JWT tokens (not cookies),
  // we can't check authentication in middleware.
  // Route protection is handled client-side in each protected page.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
