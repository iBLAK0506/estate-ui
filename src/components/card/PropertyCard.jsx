import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ prop }) {
  return (
    <div className="property-card" style={{border:'1px solid #ddd',padding:12,borderRadius:8}}>
      <img src={prop.images?.[0] || '/bg.png'} alt={prop.title} style={{width:'100%',height:150,objectFit:'cover',borderRadius:6}} />
      <h3>{prop.title}</h3>
      <p>{prop.city} — ${prop.price}</p>
      <p>{prop.beds} beds · {prop.baths} baths</p>
      <div style={{display:'flex',gap:8}}>
        <Link to={`/properties/${prop._id}`}>View</Link>
      </div>
    </div>
  );
}
