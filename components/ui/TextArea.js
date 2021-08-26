export default function TextArea({
	label = "",
	className,
	register,
	error = "",
	...props
}) {
	return (
		<div>
			<div className="text-sm text-gray-500">{label}</div>
			<div className="flex rounded-lg shadow-lg border-2 px-2 py-1">
				<textarea
					className={"outline-none flex-1 " + className}
					{...register}
					{...props}
				/>
			</div>
			{error && <div className="text-sm text-red-500">{error}</div>}
		</div>
	);
}
