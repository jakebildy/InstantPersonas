import { NextResponse, NextRequest } from "next/server";
//! DO NOT DELETE THIS FILE
const ENV = process.env.NEXT_PUBLIC_ENV;
// Reroute on prod to home if trying to access /test
export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  if (ENV == "dev") {
    return res;
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/test",
};
