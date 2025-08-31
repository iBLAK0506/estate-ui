import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiClient from "../../lib/apiClient";
import "./profileUpdatePage.scss";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, email, password } = Object.fromEntries(formData);

    try {
      // Use the stable apiClient to send the update request
      const res = await apiClient.patch("/users/me", {
        name,
        // Your current backend only updates the name and avatar.
        // Email/password logic would need to be added to the controller.
      });

      // Update the global state with the new user data
      updateUser(res.data.user);

      alert("Profile updated successfully!");

      // Navigate back to the profile page
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed!");
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="name">Username</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={currentUser.name}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser.avatarUrl || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
