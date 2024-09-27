import { usePostsContext } from "../hooks/usePostsContext"
import { useEffect } from "react"
import { Post } from "../components/Post"
import {useUserContext} from '../hooks/useUserContext'
import { CreatePost } from "../components/CreatePost"
export const Home = () => {
    const {dispatch,posts} = usePostsContext()
    const {user} = useUserContext()
    const {creatorName,creatorLastname} = user
    const post = {}
    useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch('/post/', {
          headers: {
            'Authorization' : `Bearer ${user.token}`
          }
        })
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'GET_POSTS', payload: json})
        }
      }
      if(user){
        fetchPosts()
      }
  
    }, [dispatch,user])
    return (
      <div className="min-h-screen flex items-center justify-center ">
          <div className="w-1/3 flex flex-col items-center ">
            <CreatePost post={null}/>
              {posts ? posts.map((p) => 
                  <Post key={p._id} post={p} />
              ) : <p>Loading</p>}
          </div>
      </div>
  );
  
}
