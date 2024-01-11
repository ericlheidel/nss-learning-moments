import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../../services/userService.js"
import "./UserProfile.css"
import { Link, useNavigate, useParams } from "react-router-dom"

export const UserProfile = ({ currentUser }) => {
	const [user, setUser] = useState([])

	const { userId } = useParams()

	useEffect(() => {
		getUserById(userId).then((data) => {
			const userObj = data[0]
			setUser(userObj)
		})
	}, [userId])

	// if (currentUser.id !== parseInt(userId)) {
	return (
		<div className="profile">
			<h2>User Profile</h2>
			<div className="profile-group">
				<div className="user-info">Name: {user?.name}</div>
			</div>
			<div className="profile-group">
				<div className="user-info">Cohort {user?.cohort}</div>
			</div>
			<div className="profile-group">
				<div className="user-info">Posts Written: {user?.posts?.length}</div>
			</div>
			{currentUser.id === parseInt(userId) ? (
				<Link to={`/profile/edit/${userId}`}>
					<button className="btn btn-primary">Edit Profile</button>
				</Link>
			) : (
				""
			)}
		</div>
	)
	// } else {
	// 	return (
	// 		<form className="=profile">
	// 			<h2>Edit Profile</h2>
	// 			<fieldset>
	// 				<div className="form-group">
	// 					<label>Name:</label>
	// 					<input
	// 						type="text"
	// 						name="name"
	// 						value={user?.name ? user?.name : ""}
	// 						onChange={handleInputChange}
	// 						required
	// 						className="form-control"
	// 					/>
	// 				</div>
	// 			</fieldset>
	// 			<fieldset>
	// 				<div className="form-group">
	// 					<label>Email:</label>
	// 					<input
	// 						type="email"
	// 						name="email"
	// 						value={user?.email ? user?.email : ""}
	// 						onChange={handleInputChange}
	// 						required
	// 						className="form-control"
	// 					/>
	// 				</div>
	// 			</fieldset>
	// 			<fieldset>
	// 				<div className="form-group">
	// 					<label>Cohort #:</label>
	// 					<input
	// 						type="number"
	// 						name="cohort"
	// 						value={user?.cohort ? user?.cohort : ""}
	// 						onChange={handleInputChange}
	// 						required
	// 						className="form-control"
	// 					/>
	// 				</div>
	// 			</fieldset>
	// 			<fieldset>
	// 				<div className="form-group">
	// 					<button className="form-btn btn-secondary" onClick={handleSave}>
	// 						Edit Profile
	// 					</button>
	// 				</div>
	// 			</fieldset>
	// 		</form>
	// 	)
	// }
}
