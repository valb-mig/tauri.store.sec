const AuthLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<section id="content" className="flex flex-col h-full ">
				<main className="flex justify-center w-full">{children}</main>
			</section>
		</>
	);
};

export default AuthLayout;
