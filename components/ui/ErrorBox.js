export default function ErrorBox({ className, children }) {
	return (
		<div
			className={"bg-red-600 p-2 shadow-lg rounded-lg text-white " + className}
		>
			{children}
		</div>
	);
}
