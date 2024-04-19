"use client";

import { invoke } from "@tauri-apps/api/tauri";

type responseType = {
	success: boolean;
	response: string;
};

type formData = {
    title: string,
    password: string
}

const passwordHandler = () => {

    const addPassword = async (form: formData) => {

        let res: responseType | null = null;

		try {
			const result = await invoke<responseType>("run_add_password", {
                title:    form.title,
				password: form.password
			});
			res = result;
		} catch (e) {
			console.error(e);
		}

		console.log(res);
		
        if (res?.success) {
			try {
				return true;
			} catch (e) {
				console.error("[passwordHandler]: ", e);
			}
		}

        return false;
    }

	const getPasswords = async () => {

		let res: responseType | null = null;

		try {
			const result = await invoke<responseType>("run_get_passwords");
			res = result;
		} catch (e) {
			console.error(e);
		}

		console.log(res);
		
        if (res?.success) {
			try {
				return true;
			} catch (e) {
				console.error("[passwordHandler]: ", e);
			}
		}

        return false;
	}

    return { addPassword, getPasswords }
}

export default passwordHandler;