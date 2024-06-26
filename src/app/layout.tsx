import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "/public/style/globals.css";

import { GlobalContextProvider } from "@/config/context/global/store";

const rubik = Rubik({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Store.sec",
		absolute: "Store.sec",
	},
	description: "Storage for your passwords",
	icons: "/favicon.png",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={rubik.className}>
				<div className="h-screen w-screen bg-neutral-950 text-xl text-neutral-50 overflow-hidden">
					<GlobalContextProvider>{children}</GlobalContextProvider>
				</div>
			</body>
		</html>
	);
}
