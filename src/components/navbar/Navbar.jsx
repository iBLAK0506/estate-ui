import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.scss";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="LamaEstate Logo" />
          <span>LamaEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/agents">Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatarUrl || "/noavatar.jpg"}
              alt="User Avatar"
            />
            <span>{currentUser.name}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="primary-action">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>
          <img src="/menu.png" alt="Menu" />
        </div>
        {/* --- THIS IS THE FIX --- */}
        {/* The mobile menu links have been added below */}
        <div className={menuOpen ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/agents">Agents</Link>
          {!currentUser && <Link to="/login">Sign in</Link>}
          {!currentUser && <Link to="/register">Sign up</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
