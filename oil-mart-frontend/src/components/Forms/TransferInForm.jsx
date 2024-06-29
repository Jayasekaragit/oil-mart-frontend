
import React, { useState } from 'react';
import axios from 'axios';

function TransferInForm() {
  const [productID, setProductID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fromLocation, setFromLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/transfer-in', {
        product_id: productID,
        quantity,
        from_location: fromLocation
      });
      alert('Transfer In successful');
      // Clear form fields
      setProductID('');
      setQuantity('');
      setFromLocation('');
    } catch (err) {
      console.error(err);
      alert('Error in Transfer In');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product ID:</label>
        <input 
          type="text" 
          value={productID} 
          onChange={(e) => setProductID(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>From Location:</label>
        <input 
          type="text" 
          value={fromLocation} 
          onChange={(e) => setFromLocation(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Transfer In</button>
    </form>
  );
}

export default TransferInForm;
