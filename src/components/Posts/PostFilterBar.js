import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/TopicsService.js"

export const PostFilterBar = ({ setSearchTerm, setFilteredTopic }) => {
	const [allTopics, setAllTopics] = useState([])

	useEffect(() => {
		getAllTopics().then((topicsArray) => {
			setAllTopics(topicsArray)
			// console.log("topics are set!")
		})
	}, [])

	return (
		<div className="filter-bar">
			<select
				className="topic-dropdown"
				onChange={(event) => {
					setFilteredTopic(event.target.value)
				}}
			>
				<option value={0} className="topic-option" key={0}>
					All Topics
				</option>
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
			<input
				onChange={(event) => {
					setSearchTerm(event.target.value)
				}}
				type="text"
				placeholder="Search..."
				className="post-search"
			/>
		</div>
	)
}
