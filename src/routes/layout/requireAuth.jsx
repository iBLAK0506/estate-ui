import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function RequireAuth() {
  // Get the current user from the global context
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // If there is no user logged in, redirect them to the /login page
    return <Navigate to="/login" />;
  }

  // If a user is logged in, render the page they were trying to access.
  // The <Outlet /> component acts as a placeholder for the protected page
  // (e.g., ProfilePage, CreatePage, etc.).
  return <Outlet />;
}

export default RequireAuth;
