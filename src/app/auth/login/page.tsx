"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { icons } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import useLogin from "@/app/auth/hooks/useLogin";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

const ZodSchema = z.object({ token: z.string().min(8) });

type LoginSchema = z.infer<typeof ZodSchema>;

const Login = () => {
	const router = useRouter();

	const { login } = useLogin();
	const [auth, setAuth] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<LoginSchema>({
		resolver: zodResolver(ZodSchema),
	});

	const hendleFormSubmit: SubmitHandler<LoginSchema> = async (data) => {
		try {
			setAuth(await login(data));
		} catch (error) {
			setError("root", {
				message: "Connection error",
			});
		}
	};

	useEffect(() => {
		if (auth) {
			console.info("[Login] User verified!");
			router.push("/");
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
						<icons.Lock />
						Insert your token
					</span>

					<Input
						type="password"
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
						{isSubmitting ? "Loading..." : "Send"}
					</Button>

					{errors.root && (
						<div className="text-red-500 text-sm">{errors.root.message}</div>
					)}

					<span className="text-sm text-center">
						Don't remember your token?{" "}
						<Link href={"/auth/register"} className="text-purple-500">
							register
						</Link>
					</span>
				</form>
			</div>
		</>
	);
};

export default Login;
