import { type NextRequest, NextResponse } from "next/server";
import { unAuthenticated } from "./app/(api)/api/response";
import tokenVerifier from "./core/server/auth/tokenHelper";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  try {
    if (!accessToken) throw new Error("No token");
    const payload = await tokenVerifier.verify(accessToken);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", `${payload.userId}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return unAuthenticated();
  }
}

export const config = {
  matcher: [
    "/api/battleFields/:path*",
    "/api/battles/:path*",
    "/api/characters/:path*",
  ],
};
