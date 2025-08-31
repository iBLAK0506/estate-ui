import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./profilePage.scss";
import apiClient from "../../lib/apiClient";
// --- FIX: Import your REAL components ---
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";

function ProfilePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState(
    currentUser?.avatarUrl || "/noavatar.jpg"
  );
  const avatars = ["/noavatar.jpg", "/avatar2.png", "/avatar3.png"];

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // const handleAvatarChange = (avatar) => {
  //   setSelectedAvatar(avatar);
  //   // In a real app, you would make an API call here to save the new avatar
  //   // For example:
  //   // apiClient.patch("/users/me", { avatarUrl: avatar }).then(res => {
  //   //   updateUser(res.data.user); // Update the context with the new user info
  //   // });
  // };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={selectedAvatar} alt="User Avatar" />
            </span>
            <span>
              Username: <b>{currentUser.name}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout} className="logoutButton">
              Logout
            </button>
          </div>

          <div className="avatar-options">
            <h2>Select Avatar</h2>
            <div className="avatar-grid">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={avatar}
                  alt="Avatar option"
                  className={selectedAvatar === avatar ? "selected" : ""}
                  onClick={() => handleAvatarChange(avatar)}
                />
              ))}
            </div>
          </div>

          <div className="title">
            <h1>My List</h1>
            <Link to="/create">
              <button>Create New Post</button>
            </Link>
          </div>
          {/* This now uses your real List component */}
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          {/* This now uses your real Chat component */}
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
