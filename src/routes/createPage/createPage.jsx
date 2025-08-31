import React, { useState } from "react";
// 1. Import the default export from your stable apiClient
import apiClient from "../../lib/apiClient";
import { useNavigate } from "react-router-dom";
import "./createPage.scss"; // Assuming you have styles for this page

function CreatePage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, price, city, description } = Object.fromEntries(formData);

    try {
      // 2. Use the stable apiClient to make the API call
      const res = await apiClient.post("/properties", {
        title,
        price: Number(price),
        city,
        description,
      });

      // Navigate to the new property's page on success
      navigate("/properties/" + res.data.item._id);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create property.");
    }
  };

  return (
    <div className="createPage">
      <form onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        <div className="item">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" />
        </div>
        <div className="item">
          <label htmlFor="price">Price</label>
          <input id="price" name="price" type="number" />
        </div>
        <div className="item">
          <label htmlFor="city">City</label>
          <input id="city" name="city" type="text" />
        </div>
        <div className="item description">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description"></textarea>
        </div>
        <button className="sendButton">Add</button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}

export default CreatePage;
