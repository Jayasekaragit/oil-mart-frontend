
import React, { useState } from 'react';
// import BarcodeScanner from '../BarcodeScanner';
import GRNForm from './GRNForm';
import TransferInForm from './TransferInForm';
import TransferOutForm from './TransferOutForm';
import ShopForm from './ShopForm';
import UserToShopForm from './UserToShopForm';
import Modal from 'react-modal';

function Orders() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cart, setCart] = useState([]);
  
    const handleOpenModal = (cart) => {
      setCart(cart);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div className="App" >
        <h1>Cashier Dashboard</h1>
        {/* <BarcodeScanner onCartSubmit={handleOpenModal} /> */}
        <h2>Add GRN</h2>
        <GRNForm />
        <h2>Transfer In</h2>
        <TransferInForm />
        <h2>Transfer Out</h2>
        <TransferOutForm />
        <h2>Add Shop</h2>
        <ShopForm />
        <h2>Add User to Shop</h2>
        <UserToShopForm />

      </div>
    );
}

export default Orders