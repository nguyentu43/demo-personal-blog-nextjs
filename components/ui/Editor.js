import MdEditor from "rich-markdown-editor";

export default function Editor({ onChange, error, initValue = "" }) {
	console.log(error);
	return (
		<div>
			<div className="p-2 pl-6 border-2 rounded-lg shadow-lg max-w-full">
				<MdEditor onChange={onChange} value={initValue} />
			</div>
			<div className="text-sm text-red-500">{error}</div>
		</div>
	);
}
