import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../../services/PostsService.js"
import { Post } from "./Post.js"
import { PostFilterBar } from "./PostFilterBar.js"

export const AllPosts = () => {
	const [allPosts, setAllPosts] = useState([])
	const [filteredPosts, setFilteredPosts] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	const [filteredTopic, setFilteredTopic] = useState("")

	// INITIAL GET ALL POSTS
	useEffect(() => {
		getAllPosts().then((postsArray) => {
			setAllPosts(postsArray)
			// console.log("posts set!")
		})
	}, [])

	// SEARCH POSTS
	useEffect(() => {
		const matchingPosts = allPosts.filter(
			(post) => post.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setFilteredPosts(matchingPosts)
	}, [allPosts, searchTerm])

	// SHOW POSTS WITH SPECIFIC TOPIC
	useEffect(() => {
		if (filteredTopic !== "") {
			const matchingPosts = allPosts.filter(
				(post) => post.topic.id === parseInt(filteredTopic)
			)
			setFilteredPosts(matchingPosts)
		}
	}, [filteredTopic, allPosts])

	// SHOW ALL POSTS
	useEffect(() => {
		if (filteredTopic === "0") {
			setFilteredPosts(allPosts)
		}
	}, [filteredTopic, allPosts])

	return (
		<div className="posts-container">
			<PostFilterBar
				setFilteredTopic={setFilteredTopic}
				setSearchTerm={setSearchTerm}
			/>
			<h2>Posts</h2>
			{filteredPosts.map((postObj) => {
				return <Post post={postObj} key={postObj.id} />
			})}
		</div>
	)
}
