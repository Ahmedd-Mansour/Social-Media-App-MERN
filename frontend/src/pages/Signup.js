import React from "react";
import { useState } from "react";
import imageCompression from 'browser-image-compression';
import { useSignup } from "../hooks/useSignup";
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [Error,setError] = useState('')
  const [lastname, setLastname] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const { signup, isLoading, error } = useSignup();
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
      setProfilePicture(base64);
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
    await signup(name, lastname, email, password,profile_picture);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className=" flex flex-col justify-evenly h-[550px] items-center text-2xl font-semibold text-red"
      >
        <div className=" space-y-4 w-full max-w-sm ">
          <div className=" flex flex-col space-y-2">
            <label>Name</label>
            <input
              className="border p-1 focus:outline-none text-lg font-medium"
              type="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="  flex flex-col space-y-2">
            <label>Lastname</label>
            <input
              className="border p-1 focus:outline-none text-lg font-medium"
              type="lastname"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />
          </div>
          <div className=" flex flex-col space-y-2">
            {" "}
            <label>Email</label>
            <input
              className="border p-1 focus:outline-none text-lg font-medium"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className=" flex flex-col space-y-2">
            <label>Password</label>
            <input
              className="border p-1 focus:outline-none text-lg font-medium"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex items-center mb-4 space-y-2">
            <label
              htmlFor="fileInput"
              className="flex items-center cursor-pointer"
            >
              Add Profile Picture
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => handlePhoto(e.target.files[0])}
              className="hidden"
            />
          </div>
        </div>

        <button disabled={isLoading}>Sign up</button>
      </form>
      {error && (
        <div className="flex justify-center m-5 p-4 text-error-color font-medium">
          {error}
        </div>
      )}
    </div>
  );
};
