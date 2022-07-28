import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();
  // if (url.pathname === "/") {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }
  return NextResponse.next();
}
