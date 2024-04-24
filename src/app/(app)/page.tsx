"use client";

import { useGlobalContext } from "@/config/context/global/store";
import passwordHandler from "@/utils/handlers/passwordHandler";
import { icons } from "lucide-react";
import React, { useEffect } from "react";

import Card from "@/app/components/ui/Card";

const App = () => {
	const { passwords, setPasswords } = useGlobalContext();
	const { getPasswords } = passwordHandler();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchData = async () => {
			const storePasswords = await getPasswords();
			setPasswords(storePasswords);
		};

		fetchData();
	}, []);

	return (
		<div className="flex flex-col w-full">
			<div className="flex justify-center w-full gap-1 p-2 border-b border-neutral-900">
				<icons.Lock />
				<h1>Your passwords</h1>
			</div>
			<div className="flex w-full justify-center p-5">
				<section
					id="passwords"
					className="flex flex-col gap-5 w-full sm:max-w-fit"
				>
					{passwords.map((value, index) => (
						<Card.Root key={value.title}>
							<div className="flex gap-1 absolute top-[-.6rem] left-[-.6rem]">
								<icons.Github className="bg-neutral-800 border border-neutral-700 rounded-full w-8 h-8 p-1" />
								<span className="flex items-center gap-1 text-sm bg-yellow-800 border border-yellow-700 rounded-full h-8 p-1">
									<icons.Info />
									weak
								</span>
							</div>
							<Card.Header>
								<span
									id="title"
									className="flex flex-wrap w-full break-words text-neutral-200"
								>
									{value.title}
								</span>
								<div id="buttons" className="flex gap-2">
									<icons.EyeOff className="text-neutral-700 hover:text-neutral-500" />
									<icons.Flag className="text-red-500 hover:text-red-400" />
								</div>
							</Card.Header>
							<Card.Content>
								<span
									id="password"
									className="flex flex-wrap px-2 w-full break-words text-neutral-400"
								>
									{value.password}
								</span>
							</Card.Content>
						</Card.Root>
					))}
				</section>
			</div>
		</div>
	);
};

export default App;
