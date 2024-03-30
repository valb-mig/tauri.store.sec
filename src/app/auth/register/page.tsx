"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

const ZodSchema = z.object({
	user: z.string(),
	password: z.string(),
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
		<div>
			<form onSubmit={handleSubmit(hendleFormSubmit)}>
				<Input
					type="text"
					placeholder="Your username"
					hookForm={{ ...register("user") }}
				/>
				<Input
					type="text"
					placeholder="Your passowrd"
					hookForm={{ ...register("password") }}
				/>
				<Button key="submit" type="submit" style={{ format: "primary" }}>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default Register;
