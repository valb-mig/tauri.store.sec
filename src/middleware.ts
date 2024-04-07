import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

	console.info("-- Middleware --");
	
	const userCookie: boolean = false; // [TODO]: Verify auth cookie

	if(userCookie)
	{
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	return NextResponse.redirect(new URL("/auth/register", req.url));
}

export const config = {
	matcher: [ '//:path*' ],
};
