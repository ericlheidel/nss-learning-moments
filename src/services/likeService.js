export const postLike = (like) => {
	return fetch(`http://localhost:8002/likes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(like),
	})
}
