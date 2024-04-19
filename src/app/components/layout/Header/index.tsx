"use client";

import React, { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { icons } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Modal from "@/app/components/ui/Modal";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

import passwordHandler from '@/utils/handlers/passwordHandler';

const ZodSchema = z.object({ 
	title: z.string().min(1),
	password: z.string().min(1),
});

type AddSchema = z.infer<typeof ZodSchema>;

const Header = () => {

	const [ modal, showModal ] = useState(false);
	const { addPassword } = passwordHandler();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<AddSchema>({
		resolver: zodResolver(ZodSchema),
	});

	const hendleFormSubmit: SubmitHandler<AddSchema> = async (data) => {
		try {
			await addPassword(data);
			reset();
			showModal(!modal);
		} catch (error) {
			setError("root", {
				message: "Connection error",
			});
		}
	};

	return (
		<>
			<Modal.Root showModal={modal}>
				<Modal.Header>
					<span className='flex gap-1'>
						<icons.Archive/>Store your password
					</span>
					<icons.X onClick={() => showModal(!modal)} className='bg-neutral-900 rounded-full p-1 cursor-pointer'/>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit(hendleFormSubmit)} className='flex flex-col gap-2'>
						<Input
							type="text"
							label="Title"
							hookForm={{ ...register("title") }}
						/>
						{errors.title && (
							<span className="text-red-500 text-sm">{errors.title.message}</span>
						)}

						<Input
							type="text"
							label="Password"
							hookForm={{ ...register("password") }}
						/>
						{errors.password && (
							<span className="text-red-500 text-sm">{errors.password.message}</span>
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
			
			<header className="flex justify-between items-center px-2 h-10 w-full bg-neutral-900">
				<span id="logo" className="flex gap-2">
					<icons.ShieldEllipsis className="border rounded bg-neutral-600" />
					Store.sec
				</span>
				<div className="flex gap-1">
					<Button
						key="add"
						type="button"
						onClick={() => {
							showModal(!modal);
						}}
						style={{ format: "primary" }}
					>
						<icons.Plus width={15} /> add
					</Button>
					<Button
						key="export"
						type="button"
						onClick={() => {
							console.log("test");
						}}
					>
						<icons.Download width={15} /> export
					</Button>
				</div>
			</header>			
		</>
	);
};

export default Header;
