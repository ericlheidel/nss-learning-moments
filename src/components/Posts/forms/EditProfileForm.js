import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUser } from "../../../services/userService.js"

export const EditProfileForm = ({ currentUser }) => {
	const [user, setUser] = useState([])

	const { userId } = useParams()

	const navigate = useNavigate()

	useEffect(() => {
		getUserById(userId).then((data) => {
			const userObj = data[0]
			setUser(userObj)
		})
	}, [userId])

	const handleInputChange = (event) => {
		const stateCopy = { ...user }
		stateCopy[event.target.name] = event.target.value
		setUser(stateCopy)
	}

	const handleSave = (event) => {
		event.preventDefault()

		const editedProfile = {
			id: user.id,
			name: user.name,
			email: user.email,
			cohort: user.cohort,
		}
		updateUser(editedProfile).then(() => {
			navigate(`/profile/${currentUser.id}`)
		})
	}
	return (
		<form className="=profile">
			<h2>Edit Profile</h2>
			<fieldset>
				<div className="form-group">
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={user?.name ? user?.name : ""}
						onChange={handleInputChange}
						required
						className="form-control"
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={user?.email ? user?.email : ""}
						onChange={handleInputChange}
						required
						className="form-control"
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label>Cohort #:</label>
					<input
						type="number"
						name="cohort"
						value={user?.cohort ? user?.cohort : ""}
						onChange={handleInputChange}
						required
						className="form-control"
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<button className="form-btn btn-secondary" onClick={handleSave}>
						Edit Profile
					</button>
				</div>
			</fieldset>
		</form>
	)
}
