import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostById } from "../../../services/postsService.js"
import { getLikes, postLike } from "../../../services/likeService.js"
import "./../Post.css"

export const PostDetails = ({ currentUser }) => {
	const [post, setPost] = useState({})
	const [likes, setLikes] = useState([])
	const [likedPosts, setLikedPosts] = useState([])

	const { postId } = useParams()

	// THIS RENDERS WHEN POSTDETAILS.js INITIALLY LOADS
	useEffect(() => {
		getPostById(postId).then((data) => {
			const postObj = data[0]
			setPost(postObj)
		})
	}, [postId])

	useEffect(() => {
		getLikes().then((likesArray) => {
			setLikes(likesArray)
		})
	}, [])

	useEffect(() => {}, [])

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
						<button className="like-button" onClick={handleLike}>
							<i className="fa-solid fa-thumbs-up"></i>
						</button>
						Author: {post.user?.name}
					</>
				)}
				<div>Date Posted: {post.date}</div>
				<div>{post.dateEdited ? `Date Edited: ${post.dateEdited}` : ""}</div>
			</div>
		</section>
	)
}
