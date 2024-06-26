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
	defaultValue?: string;
	label?: string;
	placeholder?: string;
	hookForm?: object;
	style?: InputStyleOptions;
}

const Input = ({
	type,
	value,
	defaultValue,
	label,
	hookForm,
	placeholder,
	style,
}: InputProps) => {
	return (
		<div className="flex flex-col gap-1">
			{label !== undefined && (
				<div>
					<span className="text-sm text-neutral-600 border border-neutral-900 p-1 rounded">
						{label}
					</span>
				</div>
			)}
			<input
				type={type}
				value={value}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className={InputStyle(style)}
				{...hookForm}
			/>
		</div>
	);
};

export default Input;
