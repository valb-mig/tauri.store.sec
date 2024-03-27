import { icons } from "lucide-react";

const Logs = () => {
	return (
		<section
			id="logs"
			className="flex flex-col w-full gap-2 p-2 sm:w-[30vw] sm:border-l border-neutral-900"
		>
			<p className="flex gap-1 truncate text-base items-center">
				<icons.Timer />
				Recent activities
			</p>
			<div className="flex flex-col gap-2">
				{[1, 2].map((value, index) => (
					<span
						key={value}
						className="bg-neutral-900 rounded p-2 text-sm text-neutral-500"
					>
						Log {value}
					</span>
				))}
			</div>
		</section>
	);
};

export default Logs;
