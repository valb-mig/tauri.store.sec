"use client";

import Image from 'next/image';

import { icons } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

import svgWaves from '/public/assets/svg/waves1.svg';

const ZodSchema = z.object({
	password: z.string()
});

type RegisterSchema = z.infer<typeof ZodSchema>;

const Register = () => {

	const { register, handleSubmit } = useForm<RegisterSchema>({
		resolver: zodResolver(ZodSchema),
	});

	const hendleFormSubmit = (data: RegisterSchema) => {
		console.log(data);
	};

	return (
		<>
			<div className='flex w-full justify-center mt-[30vh]'>
				<form 
					onSubmit={handleSubmit(hendleFormSubmit)} 
					className="flex flex-col gap-2 bg-neutral-900 shadow-lg p-2 rounded w-full md:w-[500px] z-[999]"
				>
					<span className='text-2xl text-center'>Insert your token</span>

					<Input
						type="text"
						hookForm={{ ...register("password") }}
					/>
					<Button key="submit" type="submit" style={{ format: "primary" }}>
						Submit
					</Button>
				</form>
			</div>

			<Image
				src={svgWaves}
				alt="Wave background svg"
				className='flex w-full fixed bottom-0'
			/>
		</>
	);
};

export default Register;
