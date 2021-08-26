import { useQuery } from "react-query";
import Post from "../../../components/Post";
import Skeletion from "../../../components/Skeletion";
import Button from "../../../components/ui/Button";
import api from "../../../services/api";
import { removeSavedPost } from "../../../services/users";

export default function SavedPosts() {
	const posts = useQuery("/users/me/saved-posts");
	if (posts.isLoading) {
		<div className="md:col-span-3 lg:col-span-4 bg-white p-4 rounded-lg shadow-lg">
			<Skeletion height={20} width="w-full" />
		</div>;
	}

	async function handleRemove(pid) {
		const res = await removeSavedPost(pid);
		if (res.ok) {
			posts.refetch();
		}
	}

	return (
		<>
			{posts.data?.map((p, idx) => (
				<div key={idx} className="relative">
					<Post {...p} />
					<Button
						className="bg-red-500 text-white absolute right-2 top-2"
						onClick={() => handleRemove(p._id)}
					>
						Remove
					</Button>
				</div>
			))}
		</>
	);
}
