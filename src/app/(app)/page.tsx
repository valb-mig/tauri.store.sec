"use client";

import { useGlobalContext } from "@/config/context/global/store";
import { icons } from "lucide-react";
import React, { useEffect, useState } from "react";

import type { passwordType } from "@/types/interfaces/interface";
import passwordHandler from "@/utils/handlers/passwordHandler";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Input from "@/app/components/ui/Input";
import Modal from "@/app/components/ui/Modal";

const ZodSchema = z.object({
	id: z.string(),
	title: z.string().min(1).max(20),
	password: z.string().min(1),
});

type editSchema = z.infer<typeof ZodSchema>;

const App = () => {
	const { passwords, setPasswords } = useGlobalContext();
	const { editPassword, getPasswords } = passwordHandler();

	const [modal, showModal] = useState(false);
	const [currentPassword, setCurrentPassword] = useState<passwordType>({
		id: 0,
		title: "",
		password: "",
	});

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<editSchema>({
		resolver: zodResolver(ZodSchema),
	});

	const handleFormSubmit: SubmitHandler<editSchema> = async (data) => {
		try {
			editPassword(data);
			fetchData();
			reset();
			showModal(!modal);
		} catch (error) {
			setError("root", {
				message: "Connection error",
			});
		}
	};

	const fetchData = async () => setPasswords(await getPasswords());

	// Make it load one time
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Modal.Root showModal={modal}>
				<Modal.Header>
					<span className="flex gap-1">
						<icons.Archive />
						Edit your password
					</span>
					<icons.X
						onClick={() => showModal(!modal)}
						className="bg-neutral-900 rounded-full p-1 cursor-pointer"
					/>
				</Modal.Header>
				<Modal.Body>
					<form
						onSubmit={handleSubmit(handleFormSubmit)}
						className="flex flex-col gap-2"
					>
						<input
							defaultValue={currentPassword.id}
							{...register("id")}
							className="hidden"
						/>

						<Input
							type="text"
							label="Title"
							hookForm={{ ...register("title") }}
							defaultValue={currentPassword.title}
						/>
						{errors.title && (
							<span className="text-red-500 text-sm">
								{errors.title.message}
							</span>
						)}

						<Input
							type="text"
							label="Password"
							hookForm={{ ...register("password") }}
							defaultValue={currentPassword.password}
						/>
						{errors.password && (
							<span className="text-red-500 text-sm">
								{errors.password.message}
							</span>
						)}

						<Button
							disabled={isSubmitting}
							key="submit"
							type="submit"
							style={{ format: "primary" }}
						>
							{isSubmitting ? "Loading..." : "Add"}
						</Button>

						{errors.root && (
							<div className="text-red-500 text-sm">{errors.root.message}</div>
						)}
					</form>
				</Modal.Body>
			</Modal.Root>

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
						{passwords.length > 0 ? (
							passwords.map((value) => (
								<Card.Root
									key={value.title}
									onClick={() => navigator.clipboard.writeText(value.password)}
								>
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
											<icons.Pencil
												key={value.id}
												className="text-neutral-700 hover:text-neutral-500"
												onClick={() => {
													reset();
													setCurrentPassword({
														id: value.id,
														title: value.title,
														password: value.password,
													});
													showModal(!modal);
												}}
											/>
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
							))
						) : (
							<div>No paswords found</div>
						)}
					</section>
				</div>
			</div>
		</>
	);
};

export default App;
