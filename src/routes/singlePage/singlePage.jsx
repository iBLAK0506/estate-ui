import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { get, post } from '../../lib/apiClient';
import { AuthContext } from '../../context/AuthContext';

export default function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(()=>{
    let mounted = true;
    async function load(){
      try {
        const res = await get('/properties/' + id);
        if (mounted) setItem(res.item);
      } catch (e) {
        console.error(e);
      } finally { if (mounted) setLoading(false); }
    }
    load();
    return ()=> mounted = false;
  },[id]);

  async function addFavorite() {
    if (!user) return alert('Login to save favorite');
    try {
      setFavLoading(true);
      await post('/users/me/favorites/' + id, {});
      alert('Added to favorites');
    } catch (e) {
      alert('Failed to add favorite');
    } finally { setFavLoading(false); }
  }

  if (loading) return <div>Loading...</div>;
  if (!item) return <div>Not found</div>;

  return (
    <div style={{padding:20}}>
      <h1>{item.title}</h1>
      <img src={item.images?.[0] || '/bg.png'} alt="" style={{maxWidth:600,width:'100%'}} />
      <p>{item.city} — ${item.price}</p>
      <p>{item.description}</p>
      <div style={{marginTop:12}}>
        <button onClick={addFavorite} disabled={favLoading}>{favLoading ? 'Saving...' : 'Save to favorites'}</button>
      </div>
    </div>
  );
}
