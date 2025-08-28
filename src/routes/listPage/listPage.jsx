import React, { useEffect, useState } from 'react';
import PropertyCard from '../../components/card/PropertyCard';
import { get } from '../../lib/apiClient';

export default function ListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    async function load(){
      try {
        const res = await get('/properties');
        if (mounted) setItems(res.items || []);
      } catch (e) {
        console.error('Failed to load properties', e);
      } finally { if (mounted) setLoading(false); }
    }
    load();
    return ()=> mounted = false;
  },[]);

  if (loading) return <div>Loading properties...</div>;

  return (
    <div style={{padding:20}}>
      <h2>Listings</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12}}>
        {items.map(it=> <PropertyCard key={it._id} prop={it} />)}
      </div>
    </div>
  );
}
