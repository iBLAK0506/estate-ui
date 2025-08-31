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
      // Create a payload object to send to the backend
      const payload = { name, email };

      // Only include the password in the payload if the user entered a new one
      if (password) {
        payload.password = password;
      }

      // Send the complete payload to the backend's /users/me endpoint
      const res = await apiClient.patch("/users/me", payload);

      // Update the global state with the new user data from the response
      updateUser(res.data.user);

      alert("Profile updated successfully!");

      // Navigate back to the profile page to see the changes
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
            <label htmlFor="password">
              New Password (leave blank to keep current)
            </label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser.avatarUrl || "/noavatar.jpg"}
          alt="User Avatar"
          className="avatar"
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
