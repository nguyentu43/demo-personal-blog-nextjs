import {
	CheckCircleIcon,
	ExclamationCircleIcon,
	InformationCircleIcon,
	XCircleIcon,
} from "@heroicons/react/solid";
import React, { useMemo } from "react";
import { ActionType, useAppContext } from "../context";
import Button from "./ui/Button";

export default function AlertBox() {
	const {
		state: { alert },
		dispatch,
	} = useAppContext();

	const style = useMemo(() => {
		switch (alert?.type) {
			case "error":
				return { icon: XCircleIcon, color: "bg-red-600" };
			case "warning":
				return { icon: ExclamationCircleIcon, color: "bg-yellow-600" };
			case "success":
				return { icon: CheckCircleIcon, color: "bg-green-600" };
			case "info":
			default:
				return { icon: InformationCircleIcon, color: "bg-blue-600" };
		}
	}, [alert]);

	if (!alert) return "";

	return (
		<div
			className={
				"absolute p-2 shadow-lg rounded-lg flex items-center justify-between right-2 top-2 left-2 md:left-auto md:w-1/2 lg:w-1/3 z-30 text-white " +
				style.color
			}
		>
			<div className="flex items-center space-x-2 ">
				{React.createElement(style?.icon, { className: "w-8 h-8" })}{" "}
				<div>{alert.message}</div>
			</div>

			<Button
				className="bg-white text-black"
				onClick={() => dispatch({ type: ActionType.SET_ALERT, payload: null })}
			>
				Close
			</Button>
		</div>
	);
}
