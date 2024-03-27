"use client";

import Button from "@/app/components/ui/Button";

import { icons } from "lucide-react";

const Header = () => {
	return (
		<header className="flex justify-between items-center px-2 h-10 w-full bg-neutral-900">
			<span id="logo" className="flex gap-2">
				<icons.ShieldEllipsis className="border rounded bg-neutral-600" />
				Store.sec
			</span>
			<div className="flex gap-1">
				<Button
					key="add"
					type="button"
					onClick={() => {
						console.log("test");
					}}
					style={{ format: "primary" }}
				>
					<icons.Plus width={15} /> add
				</Button>
				<Button
					key="export"
					type="button"
					onClick={() => {
						console.log("test");
					}}
				>
					<icons.Download width={15} /> export
				</Button>
			</div>
		</header>
	);
};

export default Header;
