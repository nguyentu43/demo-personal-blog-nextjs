import api from "./api";

export const addPost = async (data) => await api(`/posts`, data, "POST", true);

export const updatePost = async ({ id, data }) =>
	await api(`/posts/${id}`, data, "PATCH", true);

export const deletePost = async (id) =>
	await api(`/posts/${id}`, null, "DELETE");
