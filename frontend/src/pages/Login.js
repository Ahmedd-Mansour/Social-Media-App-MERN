import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div>
      <form
      onSubmit={handleSubmit}
      method="POST"
      className="  flex flex-col justify-evenly h-[450px] items-center text-2xl font-semibold text-red"
    >
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <div className="flex flex-col space-y-2">
          <label>Email</label>
          <input
            className="border p-1 focus:outline-none text-lg font-medium"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Password</label>
          <input
            className="border p-1 focus:outline-none text-lg font-medium"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </div>


      <button disabled={isLoading} className="cursor-pointer">
        Login
      </button>
      
    </form>
    {error && (<div className="flex  justify-center  m-5 p-4 text-error-color font-medium ">{error}</div>)}

    </div>
    
  );
};
