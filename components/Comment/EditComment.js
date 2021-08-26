import { useForm } from "react-hook-form";
import { ActionType, useAppContext } from "../../context";
import api from "../../services/api";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import ErrorBox from "../ui/ErrorBox";

export default function EditComment({
	_id,
	content = "",
	parentType,
	parentId,
	post,
	onSubmitted,
	className = "",
}) {
	const {
		state: { user },
		dispatch,
	} = useAppContext();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: { content },
	});

	async function handleSend({ content }) {
		if (!user) return;
		if (_id) {
			await api(`/comments/${_id}`, { content }, "PATCH");
		} else {
			await api("/comments", { content, parentType, parentId, post }, "POST");
		}

		dispatch({
			type: ActionType.SET_ALERT,
			payload: { type: "success", message: "Comment has been sent" },
		});

		reset();

		onSubmitted();
	}

	return (
		<div className={"py-4" + className}>
			<form
				onSubmit={handleSubmit(handleSend)}
				className="flex flex-col space-y-2"
			>
				<TextArea
					content={content}
					placeholder="Leave some feedback"
					register={register("content", { required: true })}
				/>
				{errors?.content && (
					<ErrorBox className="self-start">Content is required</ErrorBox>
				)}
				<Button
					className="bg-blue-700 text-white mt-2 self-start"
					type="submit"
				>
					Send
				</Button>
			</form>
		</div>
	);
}
