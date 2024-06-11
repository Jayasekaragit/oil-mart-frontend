import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReturnTable = () => {
  const [stock, setStock] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [returnData, setReturnData] = useState({ quantity: '', supplier_name: '', purchase_date: '' });

  useEffect(() => {
    // Fetch stock data from the API
    axios.get('http://localhost:5000/api/retunstock')
      .then(response => {
        setStock(response.data);
      })
      .catch(error => {
        console.error('Error fetching stock:', error);
      });
  }, []);

  const handleRowClick = (stockItem) => {
    setSelectedStock(stockItem);
    setReturnData({
      quantity: stockItem.quantity,
      supplier_name: stockItem.supplier_name,
      purchase_date: stockItem.purchase_date
    });
  };

  const handleReturnFormSubmit = (e) => {
    e.preventDefault();
    const { product_id, supplier_name, quantity, purchase_date } = selectedStock;

    axios.post('http://localhost:5000/api/returns', {
      product_id,
      supplier_name: returnData.supplier_name,
      quantity: returnData.quantity,
      purchase_date: returnData.purchase_date
    })
      .then(response => {
        console.log(response.data);
        setSelectedStock(null);
      })
      .catch(error => {
        console.error('Error adding to returns:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReturnData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Stock</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product ID</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Supplier Name</th>
            <th className="py-2 px-4 border-b">Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(item => (
            <tr key={item.inventory_id} className="cursor-pointer" onClick={() => handleRowClick(item)}>
              <td className="py-2 px-4 border-b">{item.product_id}</td>
              <td className="py-2 px-4 border-b">{item.p_name}</td>
              <td className="py-2 px-4 border-b">{item.quantity}</td>
              <td className="py-2 px-4 border-b">{item.supplier_name}</td>
              <td className="py-2 px-4 border-b">{item.purchase_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStock && (
        <form onSubmit={handleReturnFormSubmit} className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-xl mb-4">Return Product</h3>
          <label className="block mb-2">
            Quantity:
            <input type="number" name="quantity" value={returnData.quantity} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
          </label>
          <label className="block mb-2">
            Supplier Name:
            <input type="text" name="supplier_name" value={returnData.supplier_name} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
          </label>
          <label className="block mb-2">
            Purchase Date:
            <input type="date" name="purchase_date" value={returnData.purchase_date} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
          </label>
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Return</button>
        </form>
      )}
    </div>
  );
};

export default ReturnTable;
