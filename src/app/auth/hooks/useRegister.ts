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

const useRegister = () => {
	const add = async (data: formType) => {
		let res: responseType | null = null;

		try {
			const result = await invoke<responseType>("run_add_token", {
				token: data.token,
			});
			res = result;
		} catch (e) {
			console.error(e);
		}

		console.log(res);

		if (res?.success) {
			try {
				generateToken(JSON.parse(res.response));
				return true;
			} catch (e) {
				console.error("[useRegister]: ", e);
			}
		}

		return false;
	};

	return { add };
};

export default useRegister;
