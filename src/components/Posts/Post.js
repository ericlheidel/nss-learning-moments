import "./Post.css"

export const Post = ({ post }) => {
	return (
		<div className="post">
			<div className="post-topic">{post.topic.name}</div>
			<div className="post-title">{post.title}</div>
			<div className="post-body">{post.body}</div>
			<div className="liked-div">
				<div className="like-buttons">
					<button className="like-button">
						<i className="fa-solid fa-thumbs-up"></i>
					</button>
					<button className="unlike-button">
						<i className="fa-solid fa-thumbs-down"></i>
					</button>
				</div>
				<div className="likes">Likes: {post.likes.length}</div>
			</div>
		</div>
	)
}
