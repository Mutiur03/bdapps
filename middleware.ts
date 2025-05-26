import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    if (
      token &&
      (pathname.startsWith("/signin") ||
        pathname.startsWith("/signup") ||
        pathname.endsWith("/onboarding"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      !token &&
      (pathname.startsWith("/udayee") || pathname.startsWith("/investor"))
    ) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    if (token && token?.role === "user" && !pathname.startsWith("/udayee")) {
      return NextResponse.redirect(new URL("/udayee/dashboard", req.url));
    }
    if (
      token &&
      token?.role === "investor" &&
      !pathname.startsWith("/investor")
    ) {
      return NextResponse.redirect(new URL("/investor/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (
          pathname === "/" ||
          pathname === "/about" ||
          pathname === "/contact"
        ) {
          return true;
        }
        if (
          !token &&
          (pathname.startsWith("/signin") ||
            pathname.endsWith("/onboarding") ||
            pathname.startsWith("/signup"))
        ) {
          return true;
        }

        if (token && token.role === "user" && pathname.startsWith("/udayee")) {
          return true;
        }
        if (
          token &&
          token.role === "investor" &&
          pathname.startsWith("/investor")
        ) {
          return true;
        }
        return !!token;
      },
    },
  }
);
// export const config = {
//   matcher: ["/((?!api|_next|static|public|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|woff|woff2|ttf|otf|css|js)).*)"],
// };
export const config = {
  matcher: [],
};
