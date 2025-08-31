import React, { useEffect, useState } from "react";
// import PropertyCard from '../../components/card/PropertyCard';

// 1. Import the default export from your stable apiClient
import apiClient from "../../lib/apiClient";
import "./listPage.scss"; // Assuming you have a stylesheet for this page

export default function ListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // 2. Use the apiClient to make the API call
        const res = await apiClient.get("/properties");

        // The successful response from axios is nested in `res.data`
        setItems(res.data.items || []);
      } catch (e) {
        console.error("Failed to load properties", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading properties...</div>;

  return (
    <div className="listPage">
      {/* You can add your actual list/card components here */}
      <h2>Listings</h2>
      {items.length === 0 && <p>No properties found.</p>}
    </div>
  );
}
