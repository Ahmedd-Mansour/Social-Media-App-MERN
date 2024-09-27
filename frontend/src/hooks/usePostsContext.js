import { PostsContext } from "../Context/postsContext";
import { useContext } from "react";
export const usePostsContext = () => {
    const context = useContext(PostsContext)
    if(!context){
        throw Error('usePostsContext must be used inside the provider')
    }
    return context
}