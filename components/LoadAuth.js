import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ActionType, useAppContext } from "../context";
import Skeletion from "./Skeletion";

export default function LoadAuth({ children }) {
	const {
		dispatch,
		state: { user },
	} = useAppContext();
	const router = useRouter();
	const [isLoadUser, setLoadUser] = useState(true);
	const { isLoading, data } = useQuery("/users/me");

	useEffect(() => {
		if (!isLoading) {
			if (!data.error) {
				dispatch({ type: ActionType.SET_USER, payload: data });
			}
			setLoadUser(!isLoadUser);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	if (isLoadUser) {
		return (
			<div className="md:col-span-3 lg:col-span-4 bg-white p-4 rounded-lg shadow-lg">
				<Skeletion height={20} width="w-full" />
			</div>
		);
	}

	return <>{children}</>;
}
