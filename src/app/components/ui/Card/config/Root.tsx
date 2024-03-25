interface CardRootProps {
	children: React.ReactNode;
	onClick?: () => void;
}

const CardRoot = ({ onClick, children }: CardRootProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex flex-col relative sm:w-[60vw] border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 hover:border-neutral-700 shadow-xl cursor-pointer p-2 rounded"
		>
			{children}
		</button>
	);
};

export default CardRoot;
