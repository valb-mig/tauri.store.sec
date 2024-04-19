/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface GlobalContextProviderInterface {
	children: React.ReactNode;
}

interface PasswordContextType {
	passwords: string[];
	setPasswords: (passwords: string[]) => void;
}

const GlobalContext = createContext<PasswordContextType>({
	passwords: [],
	setPasswords: () => {},
});

export const GlobalContextProvider = ({
	children,
}: GlobalContextProviderInterface) => {
	const [passwords, setPasswords] = useState<string[]>([]);

	useEffect(() => {
		setPasswords(["1", "2"]);
	}, []);

	return (
		<GlobalContext.Provider value={{ passwords, setPasswords }}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = (): PasswordContextType =>
	useContext(GlobalContext);
