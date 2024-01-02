export const getAllTopics = () => {
	return fetch(`http://localhost:8002/topics`).then(
		(res) => res.json())
}
