import { useEffect, useState } from "react"
import { /* Link, */ useParams } from "react-router-dom"
import { getPostById } from "../../../services/postsService.js"
// import { PostForm } from "../forms/PostForm.js"
// import { postLike } from "../../../services/likeService.js"

export const PostDetails = ({ currentUser }) => {
	const [post, setPost] = useState({})
	const { postId } = useParams()

	useEffect(() => {
		getPostById(postId).then((data) => {
			const postObj = data[0]
			setPost(postObj)
			console.log(postObj)
			console.log(`getPostById(---#${postId}---) successful!`)
		})
	}, [postId])

	// const handleLike = () => {
	// 	const newLike = {
	// 		userId: currentUser.id,
	// 		postId: post.id,
	// 	}

	// 	postLike(newLike)
	// 	console.log(newLike)
	// 	console.log("handleLike() successful!")
	// }

	return (
		<section className="post">
			<div className="post-info">
				<div className="post-topic">
					<span>{post.title}</span>
				</div>
				<div className="post-title">
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
					<button>Edit Post</button>
				) : (
					<>
						<button className="like-button" /* onClick={handleLike} */>
							<i className="fa-solid fa-thumbs-up"></i>
						</button>
						{/* <button className="unlike-button">
							<i className="fa-solid fa-thumbs-down"></i>
						</button> */}
						Author: {post.user?.name}
					</>
				)}
			</div>
			<div className="post">test</div>
		</section>
	)
}
