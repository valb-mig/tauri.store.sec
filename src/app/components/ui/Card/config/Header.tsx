const CardHeader = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <div className="flex w-full px-2 pt-4">{children}</div>;
};

export default CardHeader;
