import {
	BookmarkIcon,
	ChatIcon,
	EyeIcon,
	HashtagIcon,
	ThumbUpIcon,
} from "@heroicons/react/solid";
import moment from "moment";
import withRouter from "next/dist/client/with-router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Comment from "../../components/Comment/Comment";
import EditComment from "../../components/Comment/EditComment";
import Button from "../../components/ui/Button";
import { ActionType, useAppContext } from "../../context";
import api from "../../services/api";
import Skeletion from "../../components/Skeletion";
import { addSavedPost } from "../../services/users";
import NotFound from "../../components/NotFound";
import ReactMarkdown from "react-markdown";

const SinglePost = ({ router }) => {
	const {
		state: { user },
		dispatch,
	} = useAppContext();
	const { query } = router;
	const { data, refetch, isError, isLoading } = useQuery("post", () =>
		api(`/posts/slug/${query.slug}`)
	);

	const isLike = useMemo(
		() => data?.likes.some((v) => v._id === user?._id),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[JSON.stringify(data?.likes), user]
	);

	if (isLoading)
		return (
			<div className="col-span-4 bg-white p-4 rounded-lg">
				<Skeletion height={20} />
			</div>
		);

	if (isError) {
		return <NotFound />;
	}

	const {
		title,
		cover,
		category,
		content,
		viewCount,
		likes,
		comments,
		tags,
		owner,
		createdAt,
		_id,
	} = data;

	async function handleLike() {
		if (!user) return;
		const res = await api(
			`/posts/${_id}`,
			{
				action: isLike ? "unlike_post" : "like_post",
			},
			"POST"
		);
		if (res.ok) {
			refetch();
		}
	}

	async function handleSavePost() {
		if (!user) return;
		const res = await addSavedPost(_id);
		if (res.ok) {
			dispatch({
				type: ActionType.SET_ALERT,
				payload: { type: "success", message: "This post has been saved" },
			});
		}
	}

	return (
		<>
			<div className="col-span-4">
				<div className="bg-white rounded-lg shadow-lg relative">
					{cover && (
						<div
							className="h-52 w-full bg-cover rounded-lg shadow-lg "
							style={{
								backgroundImage: `url(${cover.url})`,
							}}
						></div>
					)}
					<BookmarkIcon
						className="w-10 bg-gray-50 h-10 right-2 top-2 absolute cursor-pointer shadow-lg p-1  text-red-500 rounded-full"
						onClick={handleSavePost}
					/>
					<div className="p-4 flex flex-col space-y-2">
						{category && (
							<Link href={"/search?category=" + category._id} passHref>
								<div className="cursor-pointer rounded-lg self-start text-sm font-bold px-1 bg-red-600 text-white">
									{category.name}
								</div>
							</Link>
						)}
						<div className="cursor-pointer text-xl font-bold">{title}</div>
						<div className="flex items-center space-x-2">
							{owner && (
								<>
									<Link href={"/users/" + owner.username} passHref>
										<div className="w-14 h-14 cursor-pointer shadow-lg relative rounded-full">
											<Image
												src={owner.avatar?.url}
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
						<div>
							<ReactMarkdown>{content}</ReactMarkdown>
						</div>
						<div className="flex items-center space-x-2 text-gray-700">
							<Button
								onClick={handleLike}
								className={isLike ? "bg-blue-700 text-white" : "text-black"}
							>
								<ThumbUpIcon className={"w-5 h-5 mr-2"} />{" "}
								<div>{likes.length}</div>
							</Button>
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
				<div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
					<div className="font-bold text-2xl flex items-center">
						<ChatIcon className="w-6 h-6 mr-2" /> Comments
					</div>
					<div className="my-4">
						<EditComment
							parentId={_id}
							parentType="post"
							post={_id}
							onSubmitted={() => refetch()}
						/>
					</div>
					<div className="flex flex-col space-y-4">
						{comments.map((comment, i) => (
							<Comment key={i} comment={comment} onDelete={() => refetch()} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default withRouter(SinglePost);

export const getStaticProps = async ({ params }) => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery("post", () =>
		api(`/posts/slug/${params.slug}`)
	);

	return {
		props: { dehydratedState: dehydrate(queryClient) },
		revalidate: 60 * 10,
	};
};

export const getStaticPaths = async () => {
	const posts = await api(`/posts?sort=popular&limit=100`);
	return {
		paths: posts.map((p) => ({
			params: { slug: p.slug },
		})),
		fallback: "blocking",
	};
};
