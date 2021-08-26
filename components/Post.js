import { EyeIcon, HashtagIcon, ThumbUpIcon } from "@heroicons/react/solid";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default function Post({
	title,
	cover,
	category,
	excerpt,
	viewCount,
	likes,
	tags,
	owner,
	slug,
	createdAt,
}) {
	return (
		<div className="bg-white rounded-lg shadow-lg">
			{cover && (
				<div
					className="h-52 w-full bg-cover rounded-lg shadow-lg "
					style={{
						backgroundImage: `url(${cover.url})`,
					}}
				></div>
			)}
			<div className="p-4 flex flex-col space-y-2">
				{category && (
					<Link href={"/search?category=" + category._id} passHref>
						<div className="cursor-pointer rounded-lg self-start text-sm font-bold px-1 bg-red-600 text-white">
							{category.name}
						</div>
					</Link>
				)}
				<Link href={"/posts/" + slug} passHref>
					<div className="cursor-pointer text-xl font-bold">{title}</div>
				</Link>
				<div className="flex items-center space-x-2">
					{owner && (
						<>
							<Link href={"/users/" + owner.username} passHref>
								<div className="w-14 h-14 shadow-lg cursor-pointer relative rounded-full">
									<Image
										src={owner.avatar?.url}
										className="rounded-full"
										layout="fill"
										alt="author"
									/>
								</div>
							</Link>
						</>
					)}
					<div>
						<div className="text-blue-600 font-bold">
							{owner ? owner.nickname : "User not found"}
						</div>
						<div className="text-sm">{moment(createdAt).fromNow()}</div>
					</div>
					<div></div>
				</div>
				<div>{excerpt}</div>
				<div className="flex items-center space-x-2 text-gray-700">
					<ThumbUpIcon className="w-5 h-5" /> <div>{likes.length}</div>
					<EyeIcon className="w-5 h-5" /> <div>{viewCount}</div>
				</div>
				<div className="flex text-gray-700 space-x-2">
					{tags.map((tag, i) => (
						<Link href={"/search?tags[]=" + tag} passHref key={i}>
							<div className="flex cursor-pointer items-center hover:text-white hover:bg-gray-400 rounded-lg">
								<HashtagIcon className="w-5 h-5" /> {tag}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
