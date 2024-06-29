import React, { useState } from 'react';
import axios from 'axios';

function ShopForm() {
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/shops', {
        name: shopName,
        location
      });
      alert('Shop added successfully');
      setShopName('');
      setLocation('');
    } catch (err) {
      console.error(err);
      alert('Error adding shop');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Shop Name:</label>
        <input 
          type="text" 
          value={shopName} 
          onChange={(e) => setShopName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Location:</label>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Add Shop</button>
    </form>
  );
}

export default ShopForm;
