import React, { useState } from 'react';
import { post } from '../../lib/apiClient';
import PrivateRoute from '../../components/PrivateRoute';

function CreateInner() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [desc, setDesc] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await post('/properties', { title, price: Number(price), city, description: desc });
      alert('Created');
      window.location.href = '/properties/' + res.item._id;
    } catch (e) {
      alert('Failed to create property');
    }
  }

  return (
    <form onSubmit={submit} style={{padding:20}}>
      <h2>Add Property</h2>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
      <input placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
      <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}

export default function CreatePage() {
  return <PrivateRoute><CreateInner/></PrivateRoute>;
}
