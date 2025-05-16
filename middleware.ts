import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    // if (
    //   token &&
    //   token.role === "user" &&
    //   token.isActivated === false &&
    //   pathname !== "/user/account-verify"
    // ) {
    //   return NextResponse.redirect(new URL("/user/account-verify", req.url));
    // }

    if (
      token &&
      (pathname.endsWith("/login") || pathname.endsWith("/register"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname === "/") {
          return true;
        }
        if (
          !token &&
          (pathname.endsWith("/login") || pathname.endsWith("/register"))
        ) {
          return true;
        }

        if (token && token.role === "user" && pathname.startsWith("/user")) {
          return true;
        }
        if (token && token.role === "admin" && pathname.startsWith("/admin")) {
          return true;
        }
        // return true;
        return !!token;
      },
    },
  }
);
// export const config = {
//   matcher: ["/((?!api|_next|static|favicon.ico|.*\\.svg).*)"],
// };
export const config = {
  matcher: [],
};
