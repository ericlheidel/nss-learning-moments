import { postLike } from "../../services/likeService.js"
import "./Post.css"
import { Link } from "react-router-dom"

export const Post = ({ post, currentUser, getAndSetAllPosts }) => {
	const handleLike = () => {
		const newLike = {
			userId: currentUser.id,
			postId: post.id,
		}

		postLike(newLike)
		console.log(newLike)
		console.log("newLike() from Post.js is working!")

		getAndSetAllPosts()
	}
	return (
		<div className="post">
			<div className="post-topic">{post.topic.name}</div>
			<Link to={`/posts/${post.id}`} key={post.id}>
				<div className="post-title">{post.title}</div>
			</Link>
			<div className="post-body">{post.body}</div>
			<div className="liked-div">
				<div className="like-buttons">
					<button
						className="like-button"
						handleLike={handleLike}
						onClick={handleLike}
					>
						<i className="fa-solid fa-thumbs-up"></i>
					</button>
					<button className="unlike-button">
						<i className="fa-solid fa-thumbs-down"></i>
					</button>
				</div>
				<div className="likes">
					Likes: {post.likes.length ? post.likes.length : "🤷‍♂️🤷‍♀️"}
				</div>
			</div>
		</div>
	)
}
