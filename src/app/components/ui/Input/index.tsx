import { tv } from "tailwind-variants";

const InputStyle = tv({
	base: "flex justify-center items-center gap-1 text-sm px-1 rounded-full",
	variants: {
		format: {
			normal:
				"text-neutral-700 bg-neutral-100 border-neutral-200 hover:bg-neutral-200 border",
			error:
				"text-white bg-neutral-800 border-neutral-700 hover:bg-neutral-700 border",
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
