import Categories from "../components/Categories";
import Post from "../components/Post";
import TopHashTags from "../components/TopHashTags";
import api from "../services/api";

export default function Home({ categories, tags, initPosts }) {
	return (
		<>
			<Categories categories={categories} />
			<TopHashTags tags={tags} />
			{initPosts.map((post, i) => (
				<Post key={i} {...post} />
			))}
		</>
	);
}

export const getStaticProps = async (ctx) => {
	const trending = await api("/posts/stats/trending");
	const initPosts = await api("/posts", { sort: "popular" });

	return {
		props: {
			categories: await api("/categories"),
			tags: trending.tags,
			initPosts,
		},
	};
};
