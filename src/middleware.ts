"use server";

import { verifyToken } from "@/utils/helpers/webToken";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	console.info("-- Middleware --");

	const userCookie: boolean = await verifyToken();

	if (req.nextUrl.pathname === "/" && !userCookie) {
		return NextResponse.redirect(new URL("/auth/register", req.url));
	}

	if (req.nextUrl.pathname !== "/" && userCookie) {
		return NextResponse.redirect(new URL("/", req.url));
	}
}

export const config = {
	matcher: ["//:path*", "/auth/register/:path*", "/auth/login/:path*"],
};
