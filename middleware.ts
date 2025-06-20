import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (
      token &&
      (pathname.startsWith("/signin") ||
        pathname.startsWith("/signup") ||
        pathname.endsWith("/onboarding") ||
        pathname === "/" ||
        pathname === "/about" ||
        pathname === "/contact")
    ) {
      if (token.role === "user") {
        return NextResponse.redirect(new URL("/udayee/dashboard", req.url));
      } else if (token.role === "investor") {
        return NextResponse.redirect(new URL("/investor/dashboard", req.url));
      } else if (token.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    }

    if (
      !token &&
      (pathname.startsWith("/udayee") || pathname.startsWith("/investor")) &&
      !pathname.endsWith("/onboarding")
    ) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (
      token?.role === "user" &&
      !(pathname.startsWith("/udayee") || pathname === "/startups")
    ) {
      return NextResponse.redirect(new URL("/udayee/dashboard", req.url));
    }

    if (
      token?.role === "investor" &&
      !pathname.startsWith("/investor") &&
      pathname !== "/startups"
    ) {
      return NextResponse.redirect(new URL("/investor/dashboard", req.url));
    }

    if (
      token?.role === "admin" &&
      !pathname.startsWith("/admin") &&
      pathname !== "/startups"
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
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

        if (token && pathname === "/startups") {
          return true;
        }
        if (token?.role === "user" && pathname.startsWith("/udayee")) {
          return true;
        }

        if (token?.role === "investor" && pathname.startsWith("/investor")) {
          return true;
        }

        if (token?.role === "admin" && pathname.startsWith("/admin")) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/about",
    "/contact",
    "/signin",
    "/signup",
    "/onboarding",
    "/udayee/:path*",
    "/investor/:path*",
    "/admin/:path*",
    "/startups",
  ],
};

// export const config = {
//   matcher: [],
// };
