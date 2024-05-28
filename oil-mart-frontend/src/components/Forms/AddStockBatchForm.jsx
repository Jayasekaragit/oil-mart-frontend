import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Set the root element for the modal

const AddStockBadgeForm = () => {
  const [badge, setBadge] = useState({
    badge_number: '',
    quantity: '',
  });
  const [barcodes, setBarcodes] = useState([]);
  const [barcodeIndex, setBarcodeIndex] = useState(0);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [currentBarcode, setCurrentBarcode] = useState('');

  const handleChange = (e) => {
    setBadge({
      ...badge,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBarcodeModalOpen(true);
  };

  const handleBarcodeSubmit = async () => {
    // Handle barcode submission
    const newBarcodes = [...barcodes, currentBarcode];
    setBarcodes(newBarcodes);
    setCurrentBarcode('');
    if (newBarcodes.length === parseInt(badge.quantity, 10)) {
      setIsBarcodeModalOpen(false);
      try {
        // Update the stock badge table (assuming badge number and other required data is available)
        const badgeResponse = await axios.post('http://localhost:5000/api/stock-badges', badge);
        console.log(badgeResponse.data);

        // Update the barcode table
        for (const barcode of newBarcodes) {
          const barcodeResponse = await axios.post('http://localhost:5000/api/barcodes', { barcode, badge_number: badge.badge_number });
          console.log(barcodeResponse.data);
        }

        // Reset form or handle success
      } catch (error) {
        console.error('Error adding stock badge or barcodes:', error);
      }
    } else {
      setBarcodeIndex(barcodeIndex + 1);
    }
  };

  return (
    <div className="max-w mx-auto m-10 overflow-auto">
      <div className="form-container shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-black">Add Stock Badge</h2>
        <form onSubmit={handleSubmit} className='flex p-3 m-3'>
          <div className='p-4'>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Badge Number</label>
              <input
                name="badge_number"
                type="text"
                value={badge.badge_number}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Badge Number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
              <input
                name="quantity"
                type="number"
                value={badge.quantity}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Quantity"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Stock Badge
            </button>
          </div>
        </form>

        <Modal
          isOpen={isBarcodeModalOpen}
          onRequestClose={() => setIsBarcodeModalOpen(false)}
          contentLabel="Enter Barcode"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
        >
          <h2 className="text-2xl mb-4">Enter Barcodes for Badge {badge.badge_number}</h2>
          {barcodes.map((barcode, index) => (
            <div key={index} className="mb-2">
              <span className="mr-2">{`Barcode ${index + 1}: ${barcode}`}</span>
            </div>
          ))}
          <input
            name="barcode"
            type="text"
            value={currentBarcode}
            onChange={(e) => setCurrentBarcode(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={`Barcode ${barcodeIndex + 1}`}
            required
          />
          <button
            onClick={handleBarcodeSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Submit Barcode
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default AddStockBadgeForm;
