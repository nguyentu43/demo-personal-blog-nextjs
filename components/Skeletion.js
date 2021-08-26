export default function Skeletion({
	className = "",
	width = "",
	height,
	...props
}) {
	return (
		<div
			className={"flex items-stretch flex-col space-y-4 " + className}
			{...props}
		>
			{Array.from({ length: height }).map((_, index) => (
				<div
					className={"h-4 bg-gray-300 animate-pulse " + width}
					key={index}
				></div>
			))}
		</div>
	);
}
