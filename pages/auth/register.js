import {
	KeyIcon,
	LoginIcon,
	MailIcon,
	UserCircleIcon,
} from "@heroicons/react/solid";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Logo from "../../components/Logo";
import Button from "../../components/ui/Button";
import ErrorBox from "../../components/ui/ErrorBox";
import Input from "../../components/ui/Input";
import LoadingIcon from "../../components/ui/LoadingIcon";
import { ActionType, useAppContext } from "../../context";
import { register } from "../../services/users";

export default function Register() {
	const {
		register: registerForm,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();

	const { dispatch } = useAppContext();
	const { data, isLoading, mutate } = useMutation(register);
	useEffect(() => {
		if (!data?.error) {
			dispatch({ type: ActionType.SET_USER, payload: data?.user });
			localStorage.setItem("token", data?.accessToken);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	function handleRegister(data) {
		const formData = new FormData();
		formData.append("username", data.username);
		formData.append("nickname", data.nickname);
		formData.append("email", data.email);
		formData.append("password", data.password);
		formData.append("avatar", data.avatar[0]);
		mutate(formData);
	}

	return (
		<div className="bg-white flex flex-col lg:flex-row rounded-lg shadow-lg">
			<div className="lg:w-1/2 flex flex-col p-4 rounded-lg bg-green-800">
				<div className="bg-white rounded-lg p-2 flex justify-center">
					<Logo />
				</div>
				<div className="flex-1 flex flex-col items-center justify-center">
					<div className="text-4xl mt-3 text-white">Register Page</div>
					<div className="p-4 mt-4 rounded-full bg-white">
						<LoginIcon className="w-8 h-8" />
					</div>
				</div>
			</div>
			<form className="flex flex-1" onSubmit={handleSubmit(handleRegister)}>
				<div className="flex flex-1 p-6 flex-col items-stretch space-y-4 justify-center">
					<Input
						input={{
							placeholder: "Enter nickname",
							error: errors.nickname?.message,
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
							placeholder: "Enter username",
							error: errors.username ? "Username is required" : "",
							register: registerForm("username", {
								required: "Username is required",
								validate: (v) =>
									v.indexOf(" ") > -1 ? "Username dont contain space" : true,
								minLength: { value: 6, message: "Min length is 6" },
								maxLength: { value: 20, message: "Max length is 20" },
							}),
						}}
						label={{ input: "Username*" }}
						icon={UserCircleIcon}
						button={false}
					/>
					<Input
						input={{
							placeholder: "Enter email",
							type: "email",
							error: errors.email?.message,
							register: registerForm("email", {
								required: "Email is required",
							}),
						}}
						label={{ input: "Email*" }}
						icon={MailIcon}
						button={false}
					/>
					<Input
						input={{
							placeholder: "Enter password",
							type: "password",
							error: errors.password?.message,
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
							error: errors.confirm_password?.message,
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
							error: errors.avatar?.message,
							register: registerForm("avatar", {
								required: "Avatar is required",
							}),
						}}
						label={{ input: "Avatar*" }}
						icon={KeyIcon}
						button={false}
					/>
					{data?.error && <ErrorBox>{data?.message}</ErrorBox>}
					<Button className="bg-green-800 text-white" type="submit">
						{isLoading && <LoadingIcon />}
						Create a account
					</Button>
				</div>
			</form>
		</div>
	);
}
