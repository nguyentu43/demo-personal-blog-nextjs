import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { ActionType, useAppContext } from "../context";
import { updatePost, addPost } from "../services/posts";
import Button from "./ui/Button";
import Editor from "./ui/Editor";
import Input from "./ui/Input";
import ListBox from "./ui/ListBox";
import LoadingIcon from "./ui/LoadingIcon";
import TextArea from "./ui/TextArea";

export default function EditPost({ initPost = {} }) {
	const {
		formState: { errors },
		register,
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			...initPost,
			tags: initPost.tags ? initPost.tags.join(",") : "",
			cover: null,
		},
	});

	const { dispatch } = useAppContext();

	const router = useRouter();

	const { isLoading, mutate, data } = useMutation(
		initPost._id ? updatePost : addPost
	);
	const categories = useQuery("/categories");

	useEffect(() => {
		if (data?._id) {
			router.replace(`/posts/${data.slug}`);
			dispatch({
				type: ActionType.SET_ALERT,
				payload: { type: "success", message: "Post has been save" },
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	async function handleSave(data) {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("content", data.content);
		formData.append("category", data.category._id);
		if (data?.cover?.length > 0) formData.append("cover", data.cover[0]);
		formData.append("excerpt", data.excerpt);
		if (data.tags) {
			for (const tag of data.tags.split(",")) {
				formData.append("tags[]", tag);
			}
		}
		if (initPost._id) mutate({ id: initPost._id, data: formData });
		else mutate(formData);
	}

	return (
		<div className="md:col-span-3 lg:col-span-4 bg-white rounded-lg shadow-lg">
			<form className="flex flex-1" onSubmit={handleSubmit(handleSave)}>
				<div className="flex flex-1 p-6 flex-col items-stretch space-y-4 justify-center overflow-auto">
					<Input
						input={{
							placeholder: "Enter title",
							error: errors?.title?.message,
							register: register("title", {
								required: "Title is required",
							}),
						}}
						label={{ input: "Title*" }}
						button={false}
					/>
					<TextArea
						label="Excerpt"
						placeholder="Enter excerpt"
						register={register("excerpt", {
							required: "Excerpt is required",
						})}
						error={errors?.excerpt?.message}
					/>
					<Input
						input={{
							placeholder: "Enter tags (separate by comma)",
							register: register("tags"),
						}}
						label={{ input: "Tags" }}
						button={false}
					/>
					{!categories.isLoading && (
						<Controller
							name="category"
							render={({ field: { onChange, value } }) => (
								<ListBox
									value={value}
									items={categories.data}
									onChange={onChange}
									error={errors?.category?.message}
								/>
							)}
							control={control}
							rules={{ required: "Category is required" }}
						/>
					)}
					<Controller
						control={control}
						name="content"
						rules={{ required: "Content is required" }}
						render={({ field: { onChange } }) => (
							<Editor
								error={errors?.content?.message}
								initValue={initPost?.content}
								onChange={(v) => (typeof v === "function" ? onChange(v()) : v)}
							/>
						)}
					/>
					<Input
						input={{
							type: "file",
							error: errors?.cover?.message,
							register: register("cover", {
								required: !initPost._id ? "Cover is required" : false,
							}),
						}}
						label={{ input: "Cover*" }}
						button={false}
					/>
					{initPost._id && (
						<div className="w-28 h-28 shadow-lg cursor-pointer relative">
							<Image src={initPost.cover?.url} layout="fill" alt="cover" />
						</div>
					)}
					<Button className="bg-green-800 self-start text-white" type="submit">
						{isLoading && <LoadingIcon />}
						{initPost._id ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</div>
	);
}
