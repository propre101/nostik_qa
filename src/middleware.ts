import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/vip-service")) {
    const token = await getToken({ req: request });
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/admin/dashboard")) {
    return await updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/vip-service/:path*"],
};
