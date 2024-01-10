import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/posts/AllPostsList.js"
import { NavBar } from "../components/nav/NavBar.js"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/posts/postDetails/PostDetails.js"
import { Favs } from "../components/posts/favs/Favs.js"
import { NewPost } from "../components/posts/newPost/NewPost.js"
import { MyPosts } from "../components/posts/myPosts/MyPosts.js"
import { PostForm } from "../components/posts/forms/PostForm.js"

export const ApplicationViews = () => {
	const [currentUser, setCurrentUser] = useState([])

	useEffect(() => {
		const localLearningUser = localStorage.getItem("learning_user")
		const learningUserObject = JSON.parse(localLearningUser)

		setCurrentUser(learningUserObject)
	}, [])

	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<NavBar />
						<Outlet />
					</>
				}
			>
				<Route index element={<AllPosts currentUser={currentUser} />} />
				<Route path="posts">
					<Route index element={<AllPosts currentUser={currentUser} />} />
					<Route
						path=":postId"
						element={<PostDetails currentUser={currentUser} />}
					/>
					<Route
						path="edit/:postId"
						element={<PostForm currentUser={currentUser} />}
					/>
				</Route>
				<Route
					path="myposts"
					element={<MyPosts currentUser={currentUser} />}
				></Route>
				<Route path="favs" element={<Favs currentUser={currentUser} />}></Route>
				<Route
					path="newpost"
					element={<NewPost currentUser={currentUser} />}
				></Route>
			</Route>
		</Routes>
	)
}
