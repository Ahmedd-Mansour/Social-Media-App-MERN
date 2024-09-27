import { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useUserContext } from '../hooks/useUserContext';
import imageCompression from 'browser-image-compression';
import { Post } from "./Post";

export const CreatePost = () => {
  const { user } = useUserContext();
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = usePostsContext();

  const handlePhoto = async (file) => {
    setError(null)
    if(file.size>(1024*1024*3)){
      setError('Image must be under 3MB')
      return 
    }
    try {
      const options = {
        maxSizeMB: 3,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      const compressedFile = await imageCompression(file, options);
      const base64 = await convertToBase64(compressedFile);
      setPhoto(base64);
    } catch (error) {
      console.error("Error compressing the image:", error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const post = {
      description,
      photo,
      creatorName: user.name,
      creatorLastname: user.lastname
    };

    const response = await fetch('/post/create', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setPhoto(null);
      setDescription('');
      dispatch({ type: 'CREATE_POST', payload: json });
    }
  };

  return (
    <div className="flex py-6 flex-col  border-b w-full border-red ">
      <form onSubmit={handleSubmit} method="post" className="flex flex-col">
        <div className="mb-4">
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 border focus:border-red border-red rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="fileInput"  className="flex items-center cursor-pointer">
            
            Add Photo
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => handlePhoto(e.target.files[0])}
            className="hidden"
          />
        </div>
        <button
          type="submit"
          disabled={!description && !photo}
          className="self-end bg-red text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Post
        </button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};
