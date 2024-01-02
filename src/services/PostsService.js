export const getAllPosts = () => {
	return fetch(`http://localhost:8002/posts?_expand=topic`).then(
		(res) => res.json()
	)
}
