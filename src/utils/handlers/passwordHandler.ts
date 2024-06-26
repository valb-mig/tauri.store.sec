"use client";

import type { passwordType, responseType } from "@/types/interfaces/interface";

import { useGlobalContext } from "@/config/context/global/store";
import { invoke } from "@tauri-apps/api/tauri";

interface formData {
	id?: string;
	title: string;
	password: string;
}

const passwordHandler = () => {
	const { passwords, setPasswords } = useGlobalContext();

	const addPassword = async (form: formData) => {
		let res: responseType | null = null;

		try {
			const result = await invoke<responseType>("run_add_password", {
				title: form.title,
				password: form.password,
			});
			res = result;
		} catch (e) {
			console.error(e);
		}

		console.log(res);

		if (res?.success) {
			try {
				setPasswords([
					...passwords,
					{
						id: 0,
						title: form.title,
						password: form.password,
					},
				]);

				return true;
			} catch (e) {
				console.error("[passwordHandler]: ", e);
			}
		}

		return false;
	};

	const editPassword = async (form: formData) => {
		let res: responseType | null = null;

		try {
			const result = await invoke<responseType>("run_edit_password", {
				id: form.id,
				title: form.title,
				password: form.password,
			});
			res = result;
		} catch (e) {
			console.error(e);
		}

		console.log(res);

		return res?.success;
	};

	const getPasswords = async () => {
		let res: responseType | null = null;

		let userPassowords: passwordType[] = [];

		try {
			const result = await invoke<responseType>("run_get_passwords", {});
			res = result;
		} catch (e) {
			console.error(e);
		}

		console.log(res);

		if (res?.success) {
			try {
				userPassowords = JSON.parse(res.response);
			} catch (e) {
				console.error("[passwordHandler]: ", e);
			}
		}

		return userPassowords;
	};

	return { addPassword, editPassword, getPasswords };
};

export default passwordHandler;
