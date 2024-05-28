import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Set the root element for the modal

const AddStockForm = () => {
  const [stock, setStock] = useState({
    product_id: '',
    expiration_date: '',
    buy_price: '',
    quantity: '',
  });
  const [products, setProducts] = useState([]);
  const [barcodes, setBarcodes] = useState([]);
  const [barcodeIndex, setBarcodeIndex] = useState(0);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [currentBarcode, setCurrentBarcode] = useState('');

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleChange = (e) => {
    setStock({
      ...stock,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBarcodeModalOpen(true);
  };

  const handleBarcodeSubmit = async () => {
    const newBarcodes = [...barcodes, currentBarcode];
    setBarcodes(newBarcodes);
    setCurrentBarcode('');
    if (newBarcodes.length === parseInt(stock.quantity, 10)) {
      setIsBarcodeModalOpen(false);
      try {
        // Update the stock table
        const stockResponse = await axios.post('http://localhost:5000/api/stocks', stock);
        console.log(stockResponse.data);

        // Update the barcode table
        for (const barcode of newBarcodes) {
          const barcodeResponse = await axios.post('http://localhost:5000/api/barcodes', { barcode, batch_id: stockResponse.data.batch_id });
          console.log(barcodeResponse.data);
        }

        // Reset form or handle success
      } catch (error) {
        console.error('Error adding stock or barcodes:', error);
      }
    } else {
      setBarcodeIndex(barcodeIndex + 1);
    }
  };

  return (
    <div className="max-w mx-auto m-10 overflow-auto">
      <div className="form-container shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-black">Add Stock</h2>
        <form onSubmit={handleSubmit} className='flex p-3 m-3'>
          <div className='p-4'>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Product</label>
              <select
                name="product_id"
                value={stock.product_id}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product.product_id} value={product.product_id}>{product.p_name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Expiration Date</label>
              <input
                name="expiration_date"
                type="date"
                value={stock.expiration_date}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Expiration Date"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Buy Price</label>
              <input
                name="buy_price"
                type="number"
                step="0.01"
                value={stock.buy_price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Buy Price"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
              <input
                name="quantity"
                type="number"
                value={stock.quantity}
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
              Add Stock
            </button>
          </div>
        </form>

        <Modal
          isOpen={isBarcodeModalOpen}
          onRequestClose={() => setIsBarcodeModalOpen(false)}
          contentLabel="Enter Barcode"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
        >
          <h2 className="text-2xl mb-4">Enter Barcode {barcodeIndex + 1}</h2>
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

export default AddStockForm;