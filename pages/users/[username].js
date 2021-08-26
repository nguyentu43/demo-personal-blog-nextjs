import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import Post from "../../components/Post";
import Button from "../../components/ui/Button";
import { useAppContext } from "../../context";
import api from "../../services/api";

const Profile = ({ profile, posts = [] }) => {
	const {
		state: { user },
	} = useAppContext();

	const router = useRouter();

	const [isFollowed, setFollowed] = useState(false);

	useEffect(() => {
		if (user) {
			setFollowed(profile.follower.some((f) => f._id === user._id));
		}

		if (user?._id === profile?._id) {
			router.replace("/users/me");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, profile]);

	async function handleFollow() {
		if (!user) return;

		const res = await api(
			`/users/${isFollowed ? "unfollow" : "follow"}`,
			{ sourceUserId: user._id, targetUserId: profile._id },
			"POST"
		);

		if (res.ok) {
			setFollowed(!isFollowed);
		}
	}

	return (
		<>
			<div className="md:col-span-3 lg:col-span-4 bg-white shadow-lg rounded-lg p-4 space-x-8 flex justify-center items-center space-y-4 flex-col md:flex-row">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-24 h-24 shadow-lg cursor-pointer relative rounded-full">
						<Image
							src={profile.avatar?.url}
							layout="fill"
							className="rounded-full"
							alt="author"
						/>
					</div>
					<div className="text-2xl">{profile.nickname}</div>
				</div>
				<div className="flex items-center space-x-10">
					<div className="flex flex-col text-center">
						<div className="text-3xl">{profile.follower.length}</div>
						<div>Follower</div>
					</div>
					<div className="flex flex-col text-center">
						<div className="text-3xl">{profile.following.length}</div>
						<div>Following</div>
					</div>
					<Button
						onClick={handleFollow}
						className={isFollowed ? "bg-blue-700 text-white" : "text-black"}
					>
						{isFollowed ? "Unfollow" : "Follow"}
					</Button>
				</div>
			</div>
			{posts.map((post, i) => (
				<Post key={i} {...post} />
			))}
		</>
	);
};

export default Profile;

export const getStaticProps = async ({ params: { username } }) => {
	const profile = await api(`/users/${username}`);
	return {
		props: { profile },
		notFound: !profile,
		revalidate: 10 * 60,
	};
};

export const getStaticPaths = async () => {
	const users = await api("/users");
	return {
		paths: users.map((user) => ({ params: { username: user.username } })),
		fallback: "blocking",
	};
};
