import { useEffect, useState } from "react"
import {
	getLikedPostsByUser,
	removeLikeByPostId,
} from "../../../services/likeService.js"

export const Favs = ({ currentUser }) => {
	const [likedPosts, setLikedPosts] = useState([])
	const [matchingPosts, setMatchingPosts] = useState([])

	const getLikedPosts = () => {
		if (currentUser) {
			console.log(currentUser.id) //!!! ***DELETE ME*** !!!
			getLikedPostsByUser(currentUser.id).then((likedPostsArray) => {
				setLikedPosts(likedPostsArray)
				console.log(likedPostsArray) //!!! ***DELETE ME*** !!!
			})
		}
	}

	useEffect(() => {
		getLikedPosts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser])

	useEffect(() => {
		const matchingPostsArray = likedPosts.filter(
			(likedPost) => likedPost.userId === currentUser.id
		)
		setMatchingPosts(matchingPostsArray)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser])

	const handleRemove = (idToDelete) => {
		removeLikeByPostId(idToDelete).then(() => {
			getLikedPosts()
		})
	}

	return (
		<div>
			{matchingPosts.map((matchingPostObj) => {
				return (
					<>
						<div className="post" key={matchingPostObj.id}>
							<div className="post-title">{matchingPostObj.post.title}</div>
							<button
								className="delete-btn btn-secondary"
								value={matchingPostObj.id}
								key={matchingPostObj.id}
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
