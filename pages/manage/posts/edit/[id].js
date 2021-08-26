import EditPost from "../../../../components/EditPost";
import api from "../../../../services/api";

export default function UpdatePost({ post }) {
	return <EditPost initPost={post} />;
}

export const getServerSideProps = async ({ params: { id } }) => {
	const post = await api(`/posts/${id}`);
	return {
		props: { post },
		notFound: !post,
	};
};
