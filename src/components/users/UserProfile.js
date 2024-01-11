import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.js"
import "./UserProfile.css"
import { Link, useParams } from "react-router-dom"

export const UserProfile = ({ currentUser }) => {
	const [user, setUser] = useState([])

	const { userId } = useParams()

	useEffect(() => {
		getUserById(userId).then((data) => {
			const userObj = data[0]
			setUser(userObj)
		})
	}, [userId])

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
}
