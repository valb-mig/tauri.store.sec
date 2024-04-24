/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

import type { passwordType } from "@/types/interfaces/interface";

interface GlobalContextProviderInterface {
	children: React.ReactNode;
}

interface PasswordContextType {
	passwords: passwordType[];
	setPasswords: (passwords: passwordType[]) => void;
}

const GlobalContext = createContext<PasswordContextType>({
	passwords: [],
	setPasswords: () => {},
});

export const GlobalContextProvider = ({
	children,
}: GlobalContextProviderInterface) => {
	const [passwords, setPasswords] = useState<passwordType[]>([]);

	return (
		<GlobalContext.Provider value={{ passwords, setPasswords }}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = (): PasswordContextType =>
	useContext(GlobalContext);
