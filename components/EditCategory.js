import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ActionType, useAppContext } from "../context";
import { addCategory, updateCategory } from "../services/categories";
import Button from "./ui/Button";
import Input from "./ui/Input";
import LoadingIcon from "./ui/LoadingIcon";

export default function EditCategory({ initCategory = {} }) {
	const {
		formState: { errors },
		register,
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			...initCategory,
			background: null,
		},
	});

	const { dispatch } = useAppContext();

	const router = useRouter();

	const { isLoading, mutate, data } = useMutation(
		initCategory._id ? updateCategory : addCategory
	);

	useEffect(() => {
		if (data?._id) {
			router.replace(`/manage/categories`);
			dispatch({
				type: ActionType.SET_ALERT,
				payload: { type: "success", message: "Category has been save" },
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	async function handleSave(data) {
		const formData = new FormData();
		formData.append("name", data.name);
		if (data?.background?.length > 0)
			formData.append("background", data.background[0]);
		if (initCategory._id) mutate({ id: initCategory._id, data: formData });
		else mutate(formData);
	}

	return (
		<div className="md:col-span-3 lg:col-span-4 bg-white rounded-lg shadow-lg">
			<form className="flex flex-1" onSubmit={handleSubmit(handleSave)}>
				<div className="flex flex-1 p-6 flex-col items-stretch space-y-4 justify-center overflow-auto">
					<Input
						input={{
							placeholder: "Enter name",
							error: errors?.name?.message,
							register: register("name", {
								required: "Name is required",
							}),
						}}
						label={{ input: "Name*" }}
						button={false}
					/>
					<Input
						input={{
							type: "file",
							error: errors?.background?.message,
							register: register("background", {
								required: !initCategory._id ? "Bg is required" : false,
							}),
						}}
						label={{ input: "Background*" }}
						button={false}
					/>
					{initCategory._id && (
						<div className="w-28 h-28 shadow-lg cursor-pointer relative">
							<Image
								src={initCategory.background?.url}
								layout="fill"
								alt="cover"
							/>
						</div>
					)}
					<Button className="bg-green-800 self-start text-white" type="submit">
						{isLoading && <LoadingIcon />}
						{initCategory._id ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</div>
	);
}
