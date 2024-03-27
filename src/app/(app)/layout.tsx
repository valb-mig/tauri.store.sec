import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import Logs from "@/app/components/layout/Logs";

const AppLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Header />
			<section id="content" className="flex flex-col h-full sm:flex-row">
				<main className="flex justify-center w-full">{children}</main>
				<Logs />
			</section>
			<Footer />
		</>
	);
};

export default AppLayout;
