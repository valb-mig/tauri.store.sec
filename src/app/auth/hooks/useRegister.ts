"use client";

import { useRouter } from 'next/router';

import { invoke } from '@tauri-apps/api/tauri'
import { generateToken } from '@/utils/webTokenHelper';

type formType = {
    token: string;
}

type responseType = {
    success: boolean,
    response: string
}

const useRegister = () => {

    const add = async (data: formType) => {

        let res: responseType | null = null;

        try {
            const result = await invoke<responseType>('run_add_token', { token: data.token });
            res = result;
        } catch(e) {
            console.error(e);
        }

        if(res?.success) {

            try {
                generateToken(JSON.parse(res.response));
                useRouter().reload();
            }
            catch(e) {
                console.error("[useRegister]: ",e);
            }
        }
    }

    return { add };
}

export default useRegister;