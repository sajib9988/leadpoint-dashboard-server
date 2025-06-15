import { getCurrentUser } from "@/service/auth";
import { NextRequest, NextResponse } from "next/server"; 




const publicRoutes = ["/login", "/register"];

export const middleware = async (request: NextRequest) => {
  const { pathname, origin } = request.nextUrl;
  const userInfo = await getCurrentUser();

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!userInfo) {
    // Not logged in and trying to access a protected route
    if (!isPublicRoute) {
      const redirectUrl = `${origin}/login?redirectPath=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next(); // Accessing public route like /login
  }

  // Logged in user trying to access /login
  if (pathname === "/login") {
      return NextResponse.redirect(`${origin}/dashboard`);

  }

  // Logged in and accessing any other route
  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
