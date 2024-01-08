export const getAllPosts = () => {
	return fetch(`http://localhost:8002/posts?_expand=topic&_embed=likes`).then(
		(res) => res.json()
	)
}

export const getPostById = (postId) => {
	return fetch(
		`http://localhost:8002/posts?id=${postId}&_expand=topic&_expand=user&_embed=likes`
	).then((res) => res.json())
}

export const updatePost = (post) => {
	return fetch(`http://localhost:8002/posts/${post.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(post),
	})
}
