export const postLike = (like) => {
	return fetch(`http://localhost:8002/likes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(like),
	})
}

export const getLikedPostsByUser = (userId) => {
	return fetch(
		`http://localhost:8002/likes?userId=${userId}&_expand=user&_expand=post`
	).then((res) => res.json())
}

export const removeLikeById = (likeId) => {
	return fetch(`http://localhost:8002/likes/${likeId}`, {
		method: "DELETE",
	})
}
