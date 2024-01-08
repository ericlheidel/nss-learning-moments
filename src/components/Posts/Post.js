import "./Post.css"
import { Link } from "react-router-dom"

export const Post = ({ post }) => {
	return (
		<div className="post">
			<Link to={`/posts/${post.id}`} key={post.id}>
				<div className="post-title">{post.title}</div>
			</Link>
			<div className="post-topic">{post.topic?.name}</div>
			<div className="liked-div">
				<div className="likes">
					Likes: {post.likes.length ? post.likes.length : "🤷‍♂️🤷‍♀️"}
				</div>
			</div>
		</div>
	)
}
