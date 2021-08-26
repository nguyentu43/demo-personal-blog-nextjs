import Button from "./Button";

const defaultProps = {
	input: { className: "", type: "text", value: "" },
	button: { className: "" },
};

export default function Input({
	className = "",
	label,
	error,
	input = {},
	button = {},
	...props
}) {
	const mergeInput = Object.assign({}, defaultProps.input, input);
	const mergeButton = Object.assign({}, defaultProps.button, button);
	return (
		<div className={className}>
			{label && (
				<div className="flex justify-between text-sm text-gray-500">
					<div>{label.input}</div>
					<div>{label.pattern}</div>
				</div>
			)}
			<div className={`flex shadow-lg items-center border-2 rounded-lg p-1`}>
				{props.icon && <props.icon className="w-8 h-8 text-gray-300" />}
				<input
					className={"flex-1 px-2 py-1 outline-none" + mergeInput.className}
					type={mergeInput.type}
					placeholder={mergeInput.placeholder}
					{...mergeInput.register}
					value={input.value}
					onChange={input.onChange}
				/>
				{button && (
					<Button
						className={mergeButton.className}
						onClick={mergeButton.onClick}
					>
						{mergeButton.name}
					</Button>
				)}
			</div>
			{input.error && <div className="text-sm text-red-500">{input.error}</div>}
		</div>
	);
}
