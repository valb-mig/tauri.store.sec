"use client";

import type { responseType } from "@/types/interfaces/interface";

import { invoke } from "@tauri-apps/api/tauri";

const userHandler = () => {

    const checkUser = async () => {
		
        let res: responseType | null = null;

        try {
			const result = await invoke<responseType>("run_check_user", {});
			res = result;
		} catch (e) {
			console.error(e);
		}

		console.log(res);

		if (res?.success) {
			try {
				return true;
			} catch (e) {
				console.error("[userHandler]: ", e);
			}
		}

		return false;
    }

	return { checkUser };
}

export default userHandler;