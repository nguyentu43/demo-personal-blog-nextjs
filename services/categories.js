import api from "./api";

export const addCategory = async (data) =>
	await api("/categories", data, "POST", true);

export const updateCategory = async ({ id, data }) =>
	await api(`/categories/${id}`, data, "PATCH", true);

export const deleteCategory = async (id) =>
	await api(`/categories/${id}`, null, "DELETE");
