import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = req.nextUrl.pathname === "/";
  const isPasswordResetRoute = 
    req.nextUrl.pathname.startsWith("/forgot-password") || 
    req.nextUrl.pathname.startsWith("/reset-password");

  // Allow public routes, API auth routes, and password reset routes
  if (isPublicRoute || isApiAuthRoute || isPasswordResetRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users away from login page
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}; 