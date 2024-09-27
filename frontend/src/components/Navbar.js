import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
export const Navbar = () => {
  const { logout } = useLogout();
  const {user} = useUserContext()
  const handleClick = () => {
    logout();
  };

  return (
    <div className="flex justify-between p-6 font-semibold text-2xl text-red border-b   mb-4 items-center">
      <Link className="hover:opacity-70" to="/">Home</Link>
      {!user && (
        <div className="space-x-6">
          <Link className="hover:opacity-70"  to="/login">Login</Link>
          <Link className="hover:opacity-70" to="/signup">Signup</Link>
        </div>
      )}
      {user && (
        <div className="flex space-x-32"  >
          <Link className="font-semibold text-2xl text-red" to="/profile">{user.name} {user.lastname}</Link>
          <div className="space-x-6">
          <button  className="hover:opacity-70" onClick={handleClick}>Logout</button>
          </div>
          
        </div>
      )}
      
    </div>
  );
};
