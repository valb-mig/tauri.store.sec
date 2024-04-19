"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { icons } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "@/app/auth/hooks/useAuth";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

const ZodSchema = z.object({ token: z.string().min(8) });

type RegisterSchema = z.infer<typeof ZodSchema>;

const Register = () => {
	const router = useRouter();

	const { userRegister } = useAuth();
	const [auth, setAuth] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(ZodSchema),
	});

	const hendleFormSubmit: SubmitHandler<RegisterSchema> = async (data) => {
		try {
			setAuth(await userRegister(data));
		} catch (error) {
			setError("root", {
				message: "Connection error",
			});
		}
	};

	useEffect(() => {
		if (auth) {
			console.info("[Add] User created!");
			router.refresh();
		}
	}, [auth, router]);

	return (
		<>
			<div className="flex w-full justify-center px-5 mt-[30vh]">
				<form
					onSubmit={handleSubmit(hendleFormSubmit)}
					className="flex flex-col gap-2 bg-neutral-900 shadow-sm p-2 rounded w-full md:w-[500px] z-[999] border-b-2 border-neutral-800"
				>
					<span className="flex items-center gap-2 justify-center p-2 text-2xl text-neutral-400 border-b border-neutral-800">
						<icons.KeyRound />
						Register your token
					</span>

					<Input
						type="text"
						placeholder=""
						hookForm={{ ...register("token") }}
					/>
					{errors.token && (
						<span className="text-red-500 text-sm">{errors.token.message}</span>
					)}

					<Button
						disabled={isSubmitting}
						key="submit"
						type="submit"
						style={{ format: "primary" }}
					>
						{isSubmitting ? "Loading..." : "Submit"}
					</Button>

					{errors.root && (
						<div className="text-red-500 text-sm">{errors.root.message}</div>
					)}

					<span className="text-sm text-center">
						Already has a token?{" "}
						<Link href={"/auth/login"} className="text-purple-500">
							login
						</Link>
					</span>
				</form>
			</div>
		</>
	);
};

export default Register;
