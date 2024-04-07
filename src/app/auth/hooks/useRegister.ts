"use client";

import { invoke } from '@tauri-apps/api/tauri'

type formType = {
    token: string;
}

const useRegister = () => {

    const add = async (data: formType) => {

        try {

            invoke<string>('run_add_token', { token: data.token })
                .then(result => console.log(result))
                .catch(console.error);

        } catch(e) {
            console.error(e);
        }
    }

    return { add };
}

export default useRegister;