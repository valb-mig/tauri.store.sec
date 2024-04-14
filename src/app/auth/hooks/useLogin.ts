"use client";

import { generateToken } from "@/utils/webTokenHelper";
import { invoke } from "@tauri-apps/api/tauri";

type formType = {
	token: string;
};

type responseType = {
	success: boolean;
	response: string;
};

const useLogin = () => {
	const login = async (data: formType) => {
		let res: responseType | null = null;

		try {
			const result = await invoke<responseType>("run_verify_token", {
				token: data.token,
			});
			res = result;
		} catch (e) {
			console.error(e);
		}

		console.log(res);

		if (res?.success) {
			try {
				await generateToken(JSON.parse(res.response));
				return true;
			} catch (e) {
				console.error("[useLogin]: ", e);
			}
		}

		return false;
	};

	return { login };
};

export default useLogin;
