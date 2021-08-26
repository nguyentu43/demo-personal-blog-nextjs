import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useAppContext } from "../context";

export default function ProtectRoute({ children }) {
	const {
		state: { user },
	} = useAppContext();
	const router = useRouter();

	useEffect(() => {
		if (router.pathname.startsWith("/auth") && user) {
			router.replace("/");
		}
		if (router.pathname.startsWith("/manage") && !user) {
			router.replace("/");
		}
		if (
			router.pathname.startsWith("/manage/categories") &&
			(!user || user.role === "user")
		) {
			router.replace("/");
		}
		if (router.pathname.startsWith("/users/me") && !user) {
			router.replace("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return <>{children}</>;
}
