import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransferOutForm() {
  const [productID, setProductID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [toShop, setToShop] = useState('');
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/shops');
        setShops(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShops();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/transfer-out', {
        product_id: productID,
        quantity,
        to_shop_id: toShop
      });
      alert('Transfer Out successful, awaiting acceptance');
      setProductID('');
      setQuantity('');
      setToShop('');
    } catch (err) {
      console.error(err);
      alert('Error in Transfer Out');
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
        <label>To Shop:</label>
        <select 
          value={toShop} 
          onChange={(e) => setToShop(e.target.value)} 
          required
        >
          <option value="">Select a shop</option>
          {shops.map(shop => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Transfer Out</button>
    </form>
  );
}

export default TransferOutForm;
