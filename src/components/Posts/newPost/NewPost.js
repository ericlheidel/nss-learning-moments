import { useEffect, useState } from "react"
import "../forms/PostForm.css"
import { getAllTopics } from "../../../services/topicsService.js"
import { useNavigate } from "react-router-dom"
import { createNewPost } from "../../../services/postsService.js"

export const NewPost = ({ currentUser }) => {
	const [allTopics, setAllTopics] = useState([])
	const [newTopic, setNewTopic] = useState(0)
	const [newTitle, setNewTitle] = useState("")
	const [newBody, setNewBody] = useState("")

	const navigate = useNavigate()

	useEffect(() => {
		getAllTopics().then((topicsArray) => {
			setAllTopics(topicsArray)
		})
	}, [])

	useEffect(() => {
		setNewTopic(newTopic)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const today = new Date()

	const handleNewPost = (event) => {
		event.preventDefault()

		const newPost = {
			userId: currentUser.id,
			topicId: parseInt(newTopic),
			title: newTitle,
			body: newBody,
			date: today.toISOString().split("T")[0],
		}

		createNewPost(newPost).then(() => {
			navigate(`/myposts`)
		})
	}

	return (
		<form className="new-post form-group">
			<h2>New Post</h2>
			<fieldset>
				<div className="form-group">
					<label>Topic: </label>
					<select
						className="form-group new-dropdown"
						required
						onChange={(event) => {
							setNewTopic(event.target.value)
						}}
					>
						<option className="topic-option" value={newTopic} key={0}>
							Select a Topic...
						</option>
						{allTopics.map((topicObj) => {
							return (
								<option
									value={topicObj.id}
									className="topic-option"
									key={topicObj.id}
									required
								>
									{topicObj.name}
								</option>
							)
						})}
					</select>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group new-title">
					Title:
					<input
						type="text"
						placeholder="Post Title..."
						name="title"
						className="form-control new-title"
						required
						value={newTitle}
						onChange={(event) => {
							setNewTitle(event.target.value)
						}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group new-body">
					Body:
					<input
						type="text"
						placeholder="Post Body..."
						name="body"
						className="form-control new-body"
						required
						value={newBody}
						onChange={(event) => {
							setNewBody(event.target.value)
						}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div>
					<button
						className="form-control btn-primary new-btn"
						onClick={handleNewPost}
					>
						Create Post
					</button>
				</div>
			</fieldset>
		</form>
	)
}
