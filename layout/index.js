import { useRouter } from "next/dist/client/router";
import React from "react";
import AlertBox from "../components/AlertBox";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
	const router = useRouter();
	if (router.pathname.startsWith("/auth/")) {
		return (
			<div className="bg-indigo-50 p-7 min-h-screen relative px-7 flex justify-center items-center">
				{children}
			</div>
		);
	}

	return (
		<div className="bg-indigo-50 min-h-screen relative">
			<AlertBox />
			<Header />
			<div className="px-2 md:px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-4">
				{children}
			</div>
			<Footer />
		</div>
	);
}
