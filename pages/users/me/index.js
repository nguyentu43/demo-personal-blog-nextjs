import { KeyIcon, UserCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Post from "../../../components/Post";
import Button from "../../../components/ui/Button";
import ErrorBox from "../../../components/ui/ErrorBox";
import Input from "../../../components/ui/Input";
import LoadingIcon from "../../../components/ui/LoadingIcon";
import { useAppContext } from "../../../context";
import { update } from "../../../services/users";
import ContentDialog from "../../../components/ContentDialog";
import { deletePost } from "../../../services/posts";

const ProfileMe = () => {
	const {
		state: { user },
	} = useAppContext();

	const {
		register: registerForm,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm({ defaultValues: { nickname: user?.nickname } });
	const { data, isLoading, mutate } = useMutation(update);

	const posts = useQuery(`/posts?user=${user?._id}`);

	async function handleChangeuser(data) {
		const formData = new FormData();
		formData.append("nickname", data.nickname);
		formData.append("password", data.password);
		if (data.avatar.length === 1) formData.append("avatar", data.avatar[0]);
		mutate(formData);
	}

	async function handleDelete(id) {
		const res = await deletePost(id);
		if (res.ok) {
			posts.refetch();
		}
	}

	return (
		<>
			<div className="md:col-span-2 bg-white shadow-lg rounded-lg p-4 space-x-8 flex justify-center items-center space-y-4 flex-col md:flex-row">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-24 h-24 shadow-lg cursor-pointer relative rounded-full">
						<Image
							src={user.avatar?.url}
							layout="fill"
							className="rounded-full"
							alt="author"
						/>
					</div>
					<div className="text-2xl">{user.nickname}</div>
				</div>
				<div className="flex items-center space-x-10">
					<div className="flex flex-col text-center">
						<div className="text-3xl">{user.follower.length}</div>
						<div>Follower</div>
					</div>
					<div className="flex flex-col text-center">
						<div className="text-3xl">{user.following.length}</div>
						<div>Following</div>
					</div>
				</div>
			</div>
			<div className="md:col-span-2 bg-white rounded-lg shadow-lg">
				<form className="flex flex-1" onSubmit={handleSubmit(handleChangeuser)}>
					<div className="flex flex-1 p-6 flex-col items-stretch space-y-4 justify-center">
						<Input
							input={{
								placeholder: "Enter nickname",
								error: errors?.nickname?.message,
								register: registerForm("nickname", {
									required: "Name is required",
									minLength: { value: 8, message: "Min length is 8" },
									maxLength: { value: 20, message: "Max length is 20" },
								}),
							}}
							label={{ input: "NickName*" }}
							icon={UserCircleIcon}
							button={false}
						/>

						<Input
							input={{
								placeholder: "Enter password",
								type: "password",
								error: errors?.password?.message,
								register: registerForm("password", {
									required: "Password is required",
									minLength: { value: 8, message: "Min length is 8" },
									maxLength: { value: 25, message: "Max length is 20" },
								}),
							}}
							label={{ input: "Password*" }}
							icon={KeyIcon}
							button={false}
						/>
						<Input
							input={{
								placeholder: "Enter password",
								type: "password",
								error: errors?.confirm_password?.message,
								register: registerForm("confirm_password", {
									validate: (v) => {
										return v === getValues("password")
											? true
											: "Confirm password not match password";
									},
									required: "Confirm password is required",
								}),
							}}
							label={{ input: "Confirm password*" }}
							icon={KeyIcon}
							button={false}
						/>
						<Input
							input={{
								type: "file",
								register: registerForm("avatar"),
							}}
							label={{ input: "Avatar" }}
							icon={KeyIcon}
							button={false}
						/>
						{data?.error && <ErrorBox>{data?.message}</ErrorBox>}
						<Button className="bg-green-800 text-white" type="submit">
							{isLoading && <LoadingIcon />}
							Update
						</Button>
					</div>
				</form>
			</div>
			{!posts.isLoading &&
				posts.data.map((post, i) => (
					<div key={i} className="relative">
						<Post {...post} />
						<Button
							href={`/manage/posts/edit/${post._id}`}
							className="bg-green-500 text-white absolute top-2 right-2"
						>
							Edit
						</Button>
						<ContentDialog
							title="Delete this post?"
							onAccept={() => handleDelete(post._id)}
							button={
								<Button className="bg-red-500 text-white absolute top-12 right-2">
									Remove
								</Button>
							}
						/>
					</div>
				))}
		</>
	);
};

export default ProfileMe;
