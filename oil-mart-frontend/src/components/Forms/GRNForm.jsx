import React, { useState } from 'react';
import axios from 'axios';

function GRNForm() {
  const [productID, setProductID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [supplier, setSupplier] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/grn', {
        product_id: productID,
        quantity,
        price,
        supplier
      });
      alert('GRN added successfully');
      // Clear form fields
      setProductID('');
      setQuantity('');
      setPrice('');
      setSupplier('');
    } catch (err) {
      console.error(err);
      alert('Error adding GRN');
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
        <label>Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Supplier:</label>
        <input 
          type="text" 
          value={supplier} 
          onChange={(e) => setSupplier(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Add GRN</button>
    </form>
  );
}

export default GRNForm;
