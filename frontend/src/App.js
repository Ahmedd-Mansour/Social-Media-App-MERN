import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { useUserContext } from "./hooks/useUserContext";
import { Profile } from "./pages/Profile";
function App() {
  const { user } = useUserContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
           <Route
            path="/profile"
            element={ <Profile /> }
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
