export const getUserByEmail = (email) => {
	return fetch(`http://localhost:8002/users?email=${email}`).then((res) =>
		res.json()
	)
}

export const getUsers = () => {
	return fetch(`http://localhost:8002/users`)
}

export const getUserById = (userId) => {
	return fetch(`http://localhost:8002/users?id=${userId}&_embed=posts`).then(
		(res) => res.json()
	)
}

export const updateUser = (user) => {
	return fetch(`http://localhost:8002/users/${user.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
}

export const createUser = (user) => {
	return fetch("http://localhost:8002/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	}).then((res) => res.json())
}
