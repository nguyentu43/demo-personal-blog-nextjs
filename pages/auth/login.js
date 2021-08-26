import { KeyIcon, LoginIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useMutation } from "react-query";
import { login } from "../../services/users";
import LoadingIcon from "../../components/ui/LoadingIcon";
import ErrorBox from "../../components/ui/ErrorBox";
import { ActionType, useAppContext } from "../../context";
import { useEffect } from "react";

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { dispatch } = useAppContext();

	const { data, isError, isLoading, mutate } = useMutation(login);

	useEffect(() => {
		if (data) {
			dispatch({ type: ActionType.SET_USER, payload: data.user });
			localStorage.setItem("token", data.accessToken);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<div className="bg-white flex flex-col lg:flex-row rounded-lg shadow-lg">
			<div className="lg:w-1/2 flex flex-col p-4 rounded-lg bg-indigo-800">
				<div className="bg-white rounded-lg p-2 flex justify-center">
					<Logo />
				</div>
				<div className="flex-1 flex flex-col items-center justify-center">
					<div className="text-4xl mt-3 text-white">Login Page</div>
					<div className="p-4 mt-4 rounded-full bg-white">
						<LoginIcon className="w-8 h-8" />
					</div>
				</div>
			</div>
			<form className="flex flex-1" onSubmit={handleSubmit(mutate)}>
				<div className="flex flex-1 p-6 flex-col items-stretch space-y-4 justify-center">
					<Input
						input={{
							placeholder: "Enter username",
							error: errors.username ? "Username is required" : "",
							register: register("username", { required: true }),
						}}
						label={{ input: "Username*" }}
						icon={UserCircleIcon}
						button={false}
					/>
					<Input
						input={{
							placeholder: "Enter password",
							type: "password",
							error: errors.password ? "Password is required" : "",
							register: register("password", { required: true }),
						}}
						label={{ input: "Password*" }}
						icon={KeyIcon}
						button={false}
					/>
					{isError && <ErrorBox>Username/password not match</ErrorBox>}
					<Button className="bg-blue-800 text-white" type="submit">
						{isLoading && <LoadingIcon />}
						Login
					</Button>
					<Button className="bg-gray-800 text-white" href="/auth/forgot">
						Forgot password?
					</Button>
					<Button className="bg-green-800 text-white" href="/auth/register">
						Create a account
					</Button>
				</div>
			</form>
		</div>
	);
}
