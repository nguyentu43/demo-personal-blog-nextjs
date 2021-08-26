import api from "./api";

export const login = async ({ username, password }) =>
	await api("/auth/login", { username, password }, "POST");

export const register = async (data) =>
	await api("/auth/register", data, "POST", true);

export const update = async (data) =>
	await api("/users/me/update-profile", data, "PATCH", true);

export const addSavedPost = async (postId) =>
	await api("/users/me/saved-posts", { postId }, "POST");

export const removeSavedPost = async (postId) =>
	await api("/users/me/saved-posts", { postId }, "DELETE");
