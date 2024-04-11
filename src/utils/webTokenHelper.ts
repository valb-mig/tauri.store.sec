"use server";

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

const secretToken = process.env.NEXT_PUBLIC_SECRET_TOKEN;

export async function generateToken(user: object) {

    if(secretToken !== undefined) {

        try {
            const jwtToken = jwt.sign(user, secretToken, {expiresIn:'1h'});

            console.log(jwtToken);

            cookies().set({
                name: 'jwt_auth',
                value: jwtToken,
                httpOnly: true,
                path: '/',
            });
        }
        catch(error)
        {
            console.error("[Helper]", error);
        }
    }
}

export async function verifyToken() {
    
    console.log("[Nexjs] Has token? ", cookies().has('jwt_auth'));

    if(cookies().has('jwt_auth'))
    {
       return true;
    }

    return false;
}