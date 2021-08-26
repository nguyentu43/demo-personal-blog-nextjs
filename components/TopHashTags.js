import { HashtagIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function TopHashTags({
	tags = ["fgfd", "dfg", "fgdfgd", "dfgdf"],
}) {
	return (
		<div className="col-span-1">
			<div className="text-2xl font-bold">HashTags</div>
			<div className="bg-white p-2 mt-4 rounded-lg shadow-lg h-40 max-h-40 overflow-y-auto">
				{tags.map((tag, i) => (
					<Link key={i} href={"/search?tags[]=" + tag} passHref>
						<div className="cursor-pointer text-2xl flex items-center p-2 hover:text-white hover:bg-yellow-300 rounded-lg">
							<HashtagIcon className="w-6 h-6 mr-1" />
							<div className="overflow-ellipsis flex-1 overflow-hidden">
								{tag}
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
