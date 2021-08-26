export default async function api(
	url,
	body = null,
	method = "GET",
	isFormData = false
) {
	const token =
		typeof localStorage !== "undefined" ? localStorage.getItem("token") : "";

	let res = null;
	if (!["POST", "PATCH", "PUT"].includes(method)) {
		let query = [];
		if (body) {
			for (const [key, value] of Object.entries(body)) {
				if (Array.isArray(value)) {
					query = [
						...query,
						...value.map(
							(v) =>
								encodeURIComponent(key + "[]") + "=" + encodeURIComponent(v)
						),
					];
				} else {
					query.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
				}
			}
		}
		let b_url = process.env.API_URL + url;
		if (query.length > 0) {
			b_url += "?" + query.join("&");
		}
		res = await fetch(b_url, {
			method,
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? "Bearer " + token : "",
			},
		});
	} else {
		const options = {
			method,
			credentials: "include",
			headers: {
				Authorization: token ? "Bearer " + token : "",
			},
		};

		if (isFormData) {
			options["body"] = body;
		} else {
			options["body"] = JSON.stringify(body);
			options["headers"]["Content-Type"] = "application/json";
		}

		res = await fetch(process.env.API_URL + url, options);
	}
	if (res.status === 500) {
		throw new Error(res.statusText);
	}

	return await res.json();
}
