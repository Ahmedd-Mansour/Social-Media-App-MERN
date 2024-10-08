import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { UserContextProvider } from "./Context/userContext";
import { PostsContextProvider } from "./Context/postsContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
