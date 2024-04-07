"use client";

import { icons } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import useRegister from "@/app/auth/hooks/useRegister";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

const ZodSchema = z.object({ token: z.string().min(8) });

type RegisterSchema = z.infer<typeof ZodSchema>;

const Register = () => {

	const { add } = useRegister();

	const { 
		register, 
		handleSubmit, 
		setError, 
		formState: {
			errors,
			isSubmitting
		}
	} = useForm<RegisterSchema>({
		resolver: zodResolver(ZodSchema),
	});

	const hendleFormSubmit: SubmitHandler<RegisterSchema> = async (data) => {
		try {
			await add(data);
		} catch (error) {
		  setError("root", {
			message: "Connection error",
		  });
		}
	};

	return (
		<>
			<div className='flex w-full justify-center px-5 mt-[30vh]'>
				<form 
					onSubmit={handleSubmit(hendleFormSubmit)} 
					className="flex flex-col gap-2 bg-neutral-900 shadow-sm p-2 rounded w-full md:w-[500px] z-[999] border-b-2 border-neutral-800"
				>
					<span className='flex items-center gap-2 justify-center p-2 text-2xl text-neutral-400 border-b border-neutral-800'>
						<icons.KeyRound />
						Register your token
					</span>

					<Input
						type="text"
						placeholder=""
						hookForm={{ ...register("token") }}
					/>
					{errors.token && (
						<span className='text-red-500 text-sm'>{errors.token.message}</span>
					)}
				
					<Button disabled={isSubmitting} key="submit" type="submit" style={{ format: "primary" }}>
						{isSubmitting ? "Loading..." : "Submit"}
					</Button>

					{errors.root && <div className="text-red-500 text-sm">{errors.root.message}</div>}
				</form>
			</div>
		</>
	);
};

export default Register;
