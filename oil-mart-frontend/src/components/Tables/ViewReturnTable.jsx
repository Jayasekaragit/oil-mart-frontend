import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewReturnTable = () => {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = () => {
    axios.get('http://localhost:5000/api/returns')
      .then(response => {
        setReturns(response.data);
      })
      .catch(error => {
        console.error('Error fetching returns:', error);
      });
  };

  const handleConfirmReturn = (returnId) => {
    axios.post(`http://localhost:5000/api/returns/confirm/${returnId}`)
      .then(response => {
        console.log(response.data.message);
        fetchReturns();
      })
      .catch(error => {
        console.error('Error confirming return:', error);
      });
  };

  const handleCancelReturn = (returnId) => {
    axios.delete(`http://localhost:5000/api/returns/cancel/${returnId}`)
      .then(response => {
        console.log(response.data.message);
        fetchReturns();
      })
      .catch(error => {
        console.error('Error canceling return:', error);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Returned Items</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Return ID</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Supplier Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Purchase Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {returns.map(returnItem => (
            <tr key={returnItem.return_id}>
              <td className="py-2 px-4 border-b">{returnItem.return_id}</td>
              <td className="py-2 px-4 border-b">{returnItem.p_name}</td>
              <td className="py-2 px-4 border-b">{returnItem.supplier_name}</td>
              <td className="py-2 px-4 border-b">{returnItem.quantity}</td>
              <td className="py-2 px-4 border-b">{new Date(returnItem.purchase_date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                  onClick={() => handleConfirmReturn(returnItem.return_id)}
                >
                  Confirm
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded"
                  onClick={() => handleCancelReturn(returnItem.return_id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewReturnTable;
