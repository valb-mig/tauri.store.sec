import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "/public/style/globals.css";

const rubik = Rubik({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Store.sec",
	description: "Storage for your passwords",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={rubik.className}>{children}</body>
		</html>
	);
}
