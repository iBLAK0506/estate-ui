import { useContext } from "react";
import { Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "../../App.jsx";
import "../../index.scss";
import { AuthContext } from "../../context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="app-navbar">
      <div className="brand">
        <Link to="/">RealEstate</Link>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/list">Listings</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/create">Add Property</Link>
            <button onClick={logout} style={{ marginLeft: 8 }}>
              Logout
            </button>
            <span style={{ marginLeft: 8 }}>{user.name}</span>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
