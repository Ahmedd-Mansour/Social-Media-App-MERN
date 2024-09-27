import { usePostsContext } from "../hooks/usePostsContext";
import { useState,useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useUserContext } from "../hooks/useUserContext";
export const Post = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useUserContext();
  const [likes,setLikes] = useState(post.likes)
  const [liked,setLiked] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setLiked(likes.includes(user._id));
    }
  }, [user, likes]);
  const handleClick = async () => {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const response = await fetch("/post/" + post._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };
  const handleLike = async () => {
    const url = `/post/${post._id}/${liked ? 'unlike' : 'like'}`
    setLikes( liked ? likes.filter(p => p !== user._id) : [...likes,user._id] )
    setLiked(!liked)
    try{  
        const response = await fetch(url, {
          method: "PUT",
          headers: { Authorization: `Bearer ${user.token}` },
        })
        if (response.ok) {
          
          const updatedPost = await response.json();
          setLikes(updatedPost.likes);
          setLiked(!liked);
        } else {
          const errorMsg = await response.json();
          setError(errorMsg.error);
        }
    }catch(err){
      setError(err)
    }
  }
  return (
    <div className="flex my-6 flex-col border-b w-full border-red">
      <div className="flex space-x-4 mb-4">
        <span className="font-semibold">
          {post.creatorName} {post.creatorLastname}
        </span>
        <p className=" opacity-50">
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="mb-4 flex justify-center">
        <img
          className="self-center  object-contain "
          src={post.photo}
          alt="Post Image"
        />
      </div>

      <div className="flex justify-between mb-7">
        <p >{post.description}</p>
        <button onClick={handleLike}>{!liked ? 'like' : 'unlike'}</button>
        <span>{likes.length}</span>
        {user && user._id === post.user_id && (
          <button className="opacity-80" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
