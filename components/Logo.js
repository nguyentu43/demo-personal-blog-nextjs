import { InboxIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Logo({ className = "" }) {
	return (
		<Link href="/" passHref>
			<a>
				<div className={"flex items-end space-x-1 " + className}>
					<InboxIcon className="w-6 h-6" />
					<div className="hidden font-bold text-2xl md:block">
						{process.env.WEBSITE_NAME}
					</div>
				</div>
			</a>
		</Link>
	);
}
