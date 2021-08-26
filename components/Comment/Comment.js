import { ThumbUpIcon, XCircleIcon } from "@heroicons/react/solid";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { ActionType, useAppContext } from "../../context";
import api from "../../services/api";
import ContentDialog from "../ContentDialog";
import Button from "../ui/Button";
import EditComment from "./EditComment";

export default function Comment({ comment, onDelete }) {
	const {
		state: { user },
		dispatch,
	} = useAppContext();

	const {
		data: { _id, owner, createdAt, content, likes, children },
		refetch,
	} = useQuery(`/comments/${comment._id}`, { initialData: comment });

	const isLike = useMemo(
		() => likes.some((v) => v._id === user?._id),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[JSON.stringify(likes), user]
	);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const isOwner = useMemo(() => user?._id === owner._id, [user]);

	async function handleLike() {
		if (!user) return;
		let res = await api(
			`/comments/${_id}`,
			{ action: isLike ? "unlike_comment" : "like_comment" },
			"POST"
		);
		if (res.ok) {
			refetch();
		}
	}

	async function handleDelete() {
		if (!user) return;
		let res = await api(`/comments/${_id}`, "", "DELETE");
		if (res.ok) {
			onDelete();
			dispatch({
				type: ActionType.SET_ALERT,
				payload: { message: "Comment has been deleted" },
			});
		}
	}

	return (
		<div className="flex space-x-4 p-4 border-2 border-gray-300 shadow-lg rounded-lg">
			<Link href={"/users/" + owner?.username} passHref>
				<div className="w-14 h-14 cursor-pointer shadow-lg relative rounded-full">
					<Image src={owner?.avatar?.url} layout="fill" alt="author" />
				</div>
			</Link>
			<div className="flex flex-col space-y-2 flex-1">
				<div className="flex space-x-2 items-center">
					<div className="text-blue-600 font-bold">{owner?.nickname}</div>
					<div className="text-sm">{moment(createdAt).fromNow()}</div>
				</div>
				<div>{content}</div>
				<div className="flex items-center space-x-2">
					<Button
						onClick={handleLike}
						className={
							isLike ? "bg-blue-700 text-white" : "border-2 text-black"
						}
					>
						<ThumbUpIcon className={"w-5 h-5 mr-2"} />
						<div className="text-sm">{likes?.length}</div>
					</Button>
					{isOwner && (
						<ContentDialog
							title="Delete"
							onAccept={handleDelete}
							content="Do you want to delete?"
							button={
								<Button className={"bg-red-700 p-2 text-white"}>
									<XCircleIcon className={"w-5 h-5"} />
								</Button>
							}
						/>
					)}
				</div>
				{children.map((comment, i) => (
					<Comment comment={comment} key={i} onDelete={() => refetch()} />
				))}
				<EditComment
					parentId={_id}
					parentType="comment"
					onSubmitted={() => refetch()}
				/>
			</div>
		</div>
	);
}
