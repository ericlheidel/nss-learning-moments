import "./Post.css"

export const Post = ({ post }) => {
	return (
		<div className="post">
			<div className="post-topic">{post.topic.name}</div>
			<div className="post-title">{post.title}</div>
			<div className="post-body">{post.body}</div>
			<div className="liked">
				{post.isLiked ? (
					<i className="fa-solid fa-thumbs-up"></i>
				) : (
					<button>Like</button>
				)}
			</div>
		</div>
	)
}
