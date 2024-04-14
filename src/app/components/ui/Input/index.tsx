import { tv } from "tailwind-variants";

const InputStyle = tv({
	base: "flex justify-center w-full items-center gap-1 text-lg p-2 rounded",
	variants: {
		format: {
			normal: "bg-neutral-900 text-white",
			error: "bg-red-500 text-red-300",
		},
	},
	defaultVariants: {
		format: "normal",
	},
});

interface InputStyleOptions {
	format?: "normal" | "error";
}

interface InputProps {
	type: string;
	value?: string;
	placeholder?: string;
	hookForm?: object;
	style?: InputStyleOptions;
}

const Input = ({ type, value, hookForm, placeholder, style }: InputProps) => {
	return (
		<div>
			<input
				type={type}
				value={value}
				placeholder={placeholder}
				className={InputStyle(style)}
				{...hookForm}
			/>
		</div>
	);
};

export default Input;
