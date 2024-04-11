"use server";

import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from '@/utils/webTokenHelper';

export async function middleware(req: NextRequest) {

	console.info("-- Middleware --");
	
	const userCookie: boolean = await verifyToken(); // [TODO]: Verify auth cookie

	if(req.nextUrl.pathname === "/auth/register" && userCookie)
	{
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	if((req.nextUrl.pathname === "/" && !userCookie) || (req.nextUrl.pathname === "/auth/login" && !userCookie))
	{
		return NextResponse.redirect(new URL("/auth/register", req.url));
	}
}

export const config = {
	matcher: [ '//:path*', '/auth/register/:path*', '/auth/login/:path*' ],
};
