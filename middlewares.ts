import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "./libs/isAuthenticated";


export const config = {
  matcher: ["/api/transaction/", "/((?!api|_next|.*\\..*).*)"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/transaction")) {
    const userId = await isAuthenticated(request);
    if (userId) {
      request.cookies.set("userId", userId);
      return NextResponse.next({ request });
    } else {
      return NextResponse.json(
        { message: "You are not authenticated" },
        { status: 401 }
      );
    }
  }
}