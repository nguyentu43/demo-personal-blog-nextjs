import Link from "next/link";

export default function Button({
	href,
	className = "",
	children,
	color,
	...props
}) {
	if (href) {
		return (
			<Link href={href} passHref>
				<a>
					<div
						className={`px-2 py-1 flex justify-center items-center shadow-lg  rounded-lg ${className} `}
					>
						{children}
					</div>
				</a>
			</Link>
		);
	}

	return (
		<button
			className={`flex justify-center items-center px-2 py-1 shadow-lg rounded-lg ${className} `}
			{...props}
		>
			{children}
		</button>
	);
}
