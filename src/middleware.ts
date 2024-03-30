import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const bool: boolean = true;

	if (req.nextUrl.pathname.startsWith("/")) {
		if (bool) {
			return NextResponse.redirect(new URL("/auth/register", req.url));
		}

		return NextResponse.redirect(new URL("/auth/login", req.url));
	}
}

export const config = {
	matcher: "//:path*",
};
