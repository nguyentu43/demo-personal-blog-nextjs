import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Empty from "../components/Empty";
import Post from "../components/Post";
import Skeletion from "../components/Skeletion";
import ListBox from "../components/ui/ListBox";
import NotFound from "../components/NotFound";

export default function Search() {
	const router = useRouter();
	const { data, isLoading, isError } = useQuery([
		router.asPath.replace("/search", "/posts"),
	]);

	const categories = useQuery("/categories");
	const [category, setCategory] = useState(null);

	useEffect(() => {
		if (categories.isLoading) return;

		if (router.query.category) {
			setCategory(
				categories.data.find((v) => {
					return v._id === router.query.category;
				})
			);
		} else {
			setCategory(null);
		}
	}, [categories.isLoading, router]);

	function handleChooseCategory(category) {
		const query = router.query;
		delete query["category"];
		if (category._id) query["category"] = category._id;
		router.push({
			path: "/search",
			query,
		});
	}

	if (isLoading) {
		return (
			<>
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="p-4 rounded-lg shadow-lg bg-white">
						<Skeletion height={8} width={"w-full"} />
					</div>
				))}
			</>
		);
	}

	if (isError) return <NotFound />;

	return (
		<>
			{!categories.isLoading && (
				<>
					<div className="col-span-1">
						<ListBox
							items={categories.data}
							value={category}
							onChange={handleChooseCategory}
						/>
					</div>
					<div className="md:col-span-2 lg:col-span-3 hidden md:block"></div>
				</>
			)}
			{data.length === 0 && <Empty />}
			{data.map((post, i) => (
				<Post key={i} {...post} />
			))}
		</>
	);
}
