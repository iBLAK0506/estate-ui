import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// This component wraps protected routes
function RequireAuth({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // If there is no user, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If there is a user, render the page they were trying to access
  return children;
}

export default RequireAuth;
