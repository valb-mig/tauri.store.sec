import { tv } from "tailwind-variants";

const ButtonStyle = tv({
	base: "flex justify-center items-center gap-1 text-sm px-1 rounded-full",
	variants: {
		format: {
			primary:
				"text-neutral-700 bg-neutral-100 border-neutral-200 hover:bg-neutral-200 border",
			secondary:
				"text-white bg-neutral-800 border-neutral-700 hover:bg-neutral-700 border",
			invisible: "text-white bg-inherit",
		},
	},
	defaultVariants: {
		format: "secondary",
	},
});

interface ButtonStyleOptions {
	format?: "primary" | "secondary";
}

interface ButtonProps {
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	style?: ButtonStyleOptions;
	children: React.ReactNode;
}

const Button = ({ type, onClick, style, children }: ButtonProps) => {
	return (
		<button type={type} onClick={onClick} className={ButtonStyle(style)}>
			{children}
		</button>
	);
};

export default Button;
