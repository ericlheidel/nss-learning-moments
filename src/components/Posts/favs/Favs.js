import { useEffect, useState } from "react"
import {
	getLikedPostsByUser,
	removeLikeById,
} from "../../../services/likeService.js"

export const Favs = ({ currentUser }) => {
	const [likedPosts, setLikedPosts] = useState([])

	const getLikedPosts = () => {
		if (currentUser) {
			// console.log(currentUser.id) //!!! ***DELETE ME*** !!!
			getLikedPostsByUser(currentUser.id).then((likedPostsArray) => {
				setLikedPosts(likedPostsArray)
				// console.log(likedPostsArray) //!!! ***DELETE ME*** !!!
			})
		}
	}

	useEffect(() => {
		getLikedPosts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser])

	const handleRemove = (idToDelete) => {
		removeLikeById(idToDelete).then(() => {
			getLikedPosts()
		})
	}

	return (
		<div>
			{likedPosts.map((likedPostObj) => {
				return (
					<>
						<div className="post">
							<div className="post-title">{likedPostObj.post.title}</div>
							<button
								className="delete-btn btn-secondary"
								value={likedPostObj.id}
								key={likedPostObj.id}
								onClick={(event) => {
									handleRemove(event.target.value)
								}}
							>
								Remove from Favs
							</button>
						</div>
					</>
				)
			})}
		</div>
	)
}
