import {
	InformationCircleIcon,
	LogoutIcon,
	SearchCircleIcon,
	BookmarkIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useMemo, useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import MenuDropDown from "../components/ui/MenuDropDown";
import { ActionType, useAppContext } from "../context";
import EmptyAvatar from "../images/avatar.png";

export default function Header() {
	const router = useRouter();
	const {
		state: { user },
		dispatch,
	} = useAppContext();
	const [keyword, setKeyword] = useState("");
	const items = useMemo(
		() => [
			{
				icon: InformationCircleIcon,
				name: "Profile",
				onClick: () => {
					router.push(`/users/me`);
				},
			},
			{
				icon: BookmarkIcon,
				name: "Saved Posts",
				onClick: () => {
					router.push(`/users/me/saved-posts`);
				},
			},
			{
				icon: LogoutIcon,
				name: "Log out",
				onClick: () => {
					localStorage.removeItem("token");
					dispatch({ type: ActionType.SET_USER, payload: null });
				},
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[user]
	);

	function onClickSearch() {
		router.push({ pathname: "/search", query: { keyword } });
	}

	return (
		<div className="h-24 py-4 px-2 md:px-5">
			<div className="bg-white rounded-lg shadow-lg px-4 h-full flex space-x-2 md:space-x-4 flex-row justify-between items-center">
				<Logo />
				<div className="hidden md:flex-1"></div>
				<div className="flex items-center space-x-4">
					<Input
						input={{
							placeholder: "Search something",
							value: keyword,
							onChange: (e) => setKeyword(e.target.value),
						}}
						button={{
							name: <SearchCircleIcon className="w-6 h-6" />,
							className: "bg-indigo-800 text-white",
							onClick: onClickSearch,
						}}
					/>
					{user ? (
						<MenuDropDown
							button={
								<div className="h-9 w-9 rounded-full shadow-lg">
									<Image
										src={user.avatar?.url ? user.avatar?.url : EmptyAvatar}
										layout="fill"
										className="rounded-full"
										alt="avatar"
									/>
								</div>
							}
							items={items}
						/>
					) : (
						<Button className="bg-green-800 text-white" href="/auth/login">
							Login
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
