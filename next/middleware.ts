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
//? If you ever change the config to match other paths, make sure the accept headers are not being intercepted for server actions and streamed UI components
//?  if (acceptHeader && acceptHeader.includes('text/x-component')) {
//?    return NextResponse.next()
//?  }
export const config = {
  matcher: "/test",
};
