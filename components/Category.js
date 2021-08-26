import Link from "next/link";

export default function Category({ category }) {
	return (
		<Link href={`/search?category=${category._id}`} passHref>
			<div
				className="bg-cover cursor-pointer flex h-32 items-center justify-center rounded-lg shadow-lg"
				style={{
					backgroundImage: `url(${category.background.url})`,
				}}
			>
				<div className="text-3xl text-stroke-2 text-stroke-black w-52 text-center font-extrabold text-white">
					{category.name}
				</div>
			</div>
		</Link>
	);
}
