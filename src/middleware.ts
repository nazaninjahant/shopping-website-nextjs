import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let isPublicRoute = false;
  if (
    request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/register" ||
    request.nextUrl.pathname === "/"
  ) {
    isPublicRoute = true;
  }

  //   if the token is not present and the route is private , redirect to login
  const token = request.cookies.get("token")?.value || "";

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  //   if the token is present and route is public , redirect to dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/dashboard"],
};
