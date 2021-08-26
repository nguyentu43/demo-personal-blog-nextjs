import { createContext, useContext, useReducer, useMemo } from "react";

export const ActionType = {
	SET_USER: "set_user",
	SET_ALERT: "set_alert",
};

const initState = { user: null, alert: null };
const reducer = (state, action) => {
	switch (action.type) {
		case ActionType.SET_USER:
			return { ...state, user: action.payload };
		case ActionType.SET_ALERT:
			return { ...state, alert: action.payload };
	}
};
export const AppContext = createContext({});
export function Provider({ children }) {
	const [state, dispatch] = useReducer(reducer, initState);
	const ctxValue = useMemo(
		() => ({
			state,
			dispatch,
		}),
		[state, dispatch]
	);

	return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
