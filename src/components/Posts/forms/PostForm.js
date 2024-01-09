import { useEffect, useState } from "react"
import { getAllTopics } from "../../../services/topicsService.js"
import { getPostById, updatePost } from "../../../services/postsService.js"
import { useNavigate, useParams } from "react-router-dom"
import "./PostForm.css"

export const PostForm = ({ currentUser }) => {
	const [post, setPost] = useState([])
	const [allTopics, setAllTopics] = useState([])
	const [editedTopic, setEditedTopic] = useState(0)

	const { postId } = useParams()

	const navigate = useNavigate()

	useEffect(() => {
		getPostById(postId).then((data) => {
			const postObj = data[0]
			setPost(postObj)
		})
	}, [postId])

	useEffect(() => {
		getAllTopics().then((topicsArray) => {
			setAllTopics(topicsArray)
		})
	}, [])

	useEffect(() => {
		setEditedTopic(post.topicId)
	}, [post])

	const handleEdit = (event) => {
		event.preventDefault()

		const editedPost = {
			id: post.id,
			userId: currentUser.id,
			topicId: parseInt(editedTopic),
			title: post.title,
			body: post.body,
			date: post.date,
		}

		updatePost(editedPost).then(() => {
			navigate(`/posts/${post.id}`)
		})
	}

	const handleInputChange = (event) => {
		const stateCopy = { ...post }
		stateCopy[event.target.name] = event.target.value
		setPost(stateCopy)
	}
	return (
		<form className="edit-post form-group">
			<h2>Edit Post</h2>
			<fieldset>
				<div className="form-group">
					<label>Topic: </label>
					<select
						className="form-group edit-dropdown"
						value={editedTopic}
						onChange={(event) => {
							setEditedTopic(event.target.value)
						}}
					>
						{allTopics.map((topicObj) => {
							return (
								<option
									value={topicObj.id}
									className="topic-option"
									key={topicObj.id}
								>
									{topicObj.name}
								</option>
							)
						})}
					</select>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group edit-title">
					Title:
					<input
						type="text"
						name="title"
						value={post?.title ? post?.title : ""}
						onChange={handleInputChange}
						required
						className="form-control edit-title"
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group edit-body">
					Body:
					<input
						name="body"
						value={post?.body ? post?.body : ""}
						onChange={handleInputChange}
						required
						className="form-group edit-body"
					/>
				</div>
			</fieldset>
			<fieldset>
				<div>
					<button
						className="btn-primary form-btn form-control"
						onClick={handleEdit}
					>
						Edit Post
					</button>
				</div>
			</fieldset>
		</form>
	)
}
