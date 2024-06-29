import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserToShopForm() {
  const [shops, setShops] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedShop, setSelectedShop] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchShopsAndUsers = async () => {
      try {
        const shopsRes = await axios.get('http://localhost:5000/api/shops');
        const usersRes = await axios.get('http://localhost:5000/api/users');
        setShops(shopsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShopsAndUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/shops/add-user', {
        shop_id: selectedShop,
        user_id: selectedUser
      });
      alert('User added to shop successfully');
      setSelectedShop('');
      setSelectedUser('');
    } catch (err) {
      console.error(err);
      alert('Error adding user to shop');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select Shop:</label>
        <select 
          value={selectedShop} 
          onChange={(e) => setSelectedShop(e.target.value)} 
          required
        >
          <option value="">Select a shop</option>
          {shops.map(shop => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Select User:</label>
        <select 
          value={selectedUser} 
          onChange={(e) => setSelectedUser(e.target.value)} 
          required
        >
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add User to Shop</button>
    </form>
  );
}

export default UserToShopForm;
