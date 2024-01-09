import { useEffect, useState } from "react"
import {
	deletePostById,
	getPostByUserId,
} from "../../../services/postsService.js"
import { Link } from "react-router-dom"
import "../Post.css"

export const MyPosts = ({ currentUser }) => {
	const [userPosts, setUserPosts] = useState([])

	const getMyPosts = () => {
		getPostByUserId(currentUser.id).then((userPostsArray) => {
			setUserPosts(userPostsArray)
		})
	}

	useEffect(() => {
		getMyPosts()
	}, [currentUser])

	// useEffect(() => {
	// 	getPostByUserId(currentUser.id).then((userPostsArray) => {
	// 		setUserPosts(userPostsArray)
	// 	})
	// }, [currentUser])

	const handleDelete = (idToDelete) => {
		deletePostById(idToDelete).then(() => {
			getMyPosts()
		})
	}

	return (
		<div className="posts-container">
			<h2>My Posts</h2>
			{userPosts.map((userPostObj) => {
				return (
					<section className="post" key={userPostObj.id}>
						<div className="post-info">
							<Link to={`/posts/${userPostObj.id}`}>
								<div className="post-title">{userPostObj.title}</div>
							</Link>
							<button
								className="delete-btn btn-primary"
								value={userPostObj.id}
								onClick={(event) => {
									handleDelete(event.target.value)
								}}
							>
								Delete Post
							</button>
						</div>
					</section>
				)
			})}
		</div>
	)
}
