import type { NextRequest } from "next/server";
import { authRoutes, privateRoutes, publicRoutes } from "./routes";
import { jwtVerify, SignJWT } from "jose";
import prismadb from "@/prisma/setup";

export async function middleware(request: NextRequest) {
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  const authCookies = request.cookies.get("authToken")?.value;
  // console.log("Auth Cookies: ", authCookies);

  let verifiedToken;
  if (authCookies) {
    const verified = await jwtVerify(
      authCookies,
      new TextEncoder().encode(process.env.JWT_TOKEN)
    );

    verifiedToken = verified.payload;
  }

  if (isAuthRoute) {
    if (verifiedToken) {
      return Response.redirect(new URL("/home", request.nextUrl));
    }

    return null;
  }

  if (!verifiedToken && !isAuthRoute && isPrivateRoute) {
    // console.log("Redirecting to Login from ", request.nextUrl.pathname);
    return Response.redirect(new URL("/login", request.nextUrl));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
