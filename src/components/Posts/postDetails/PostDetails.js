import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../../services/postsService.js"
import { postLike } from "../../../services/likeService.js"
import "./../Post.css"

export const PostDetails = ({ currentUser }) => {
	const [post, setPost] = useState({})

	const { postId } = useParams()

	const navigate = useNavigate()

	// THIS RENDERS WHEN POSTDETAILS.js INITIALLY LOADS
	useEffect(() => {
		getPostById(postId).then((data) => {
			const postObj = data[0]
			setPost(postObj)
		})
	}, [postId])

	const addLike = () => {
		const foundLike = post.likes.filter(
			(like) => like.userId === currentUser.id
		)
		if (foundLike.length === 0) {
			handleLike()
		}
	}

	const handleLike = () => {
		const newLike = {
			userId: currentUser.id,
			postId: post.id,
		}
		// THIS RENDERS THE UPDATED LIKED POST
		postLike(newLike).then(() => {
			getPostById(postId).then((data) => {
				const updatedPostObj = data[0]
				setPost(updatedPostObj)
			})
			navigate("/favs")
		})
	}

	return (
		<section className="post">
			<div className="post-info">
				<div className="post-title">
					<span>{post.title}</span>
				</div>
				<div className="post-topic">
					<span>{post.topic?.name}</span>
				</div>
				<div className="post-body">
					<span>{post.body}</span>
				</div>
				<div className="post-likes">
					<span>{post.likes?.length} Likes</span>
				</div>
			</div>
			<div className="edit-container">
				{currentUser.id === post.user?.id ? (
					<button>
						<Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
					</button>
				) : (
					<>
						<button className="like-button" onClick={addLike}>
							<i className="fa-solid fa-thumbs-up"></i>
						</button>
						Author:{" "}
						<Link className="link-author" to={`/profile/${post.userId}`}>
							{post.user?.name}
						</Link>
					</>
				)}
				<div>Date Posted: {post.date}</div>
				<div>{post.dateEdited ? `Date Edited: ${post.dateEdited}` : ""}</div>
			</div>
		</section>
	)
}
