interface ModalInterface {
	showModal: boolean;
	children: React.ReactNode;
}

const ModalRoot = ({ children, showModal }: ModalInterface) => {
	return (
		<>
			{showModal && (
				<div
					id="modal"
					className="flex justify-center w-full h-full absolute bg-black/50 z-[1]"
				>
					<div className="flex justify-center items-center h-full w-full px-2 z-[2]">
						<section className="flex w-full md:w-[500px] bg-neutral-950 border border-neutral-900 rounded">
							<div id="modal-content" className="flex flex-col w-full">
								{children}
							</div>
						</section>
					</div>
				</div>
			)}
		</>
	);
};

export default ModalRoot;
