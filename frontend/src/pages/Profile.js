import React, { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { usePostsContext } from "../hooks/usePostsContext";
import { Post } from "../components/Post";
export const Profile = () => {
  const { user } = useUserContext();
  const { dispatch, posts } = usePostsContext();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/post/profile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_POSTS", payload: json });
      }
    };
    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-9 py-14">
        <div className="flex justify-center items-center">
          <img
            className="max-w-40 h-40 rounded-full border-2 border-red border-spacing-2 border-opacity-85"
            src={user.profile_picture}
            alt="Profile"
          />
        </div>

        <p className="text-3xl font-bold text-red py-8">
          {user.name} {user.lastname}
        </p>
      </div>

      <div className="w-1/3 flex flex-col items-center pt-6 ">
        {posts && posts.map((p) => <Post key={p._id} post={p} />)}
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};
