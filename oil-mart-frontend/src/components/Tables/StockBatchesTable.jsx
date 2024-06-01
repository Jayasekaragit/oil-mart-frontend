import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockBatchesTable = () => {
  const [stockBatches, setStockBatches] = useState([]);
  const [sortedStockBatches, setSortedStockBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch stock batches from the backend
    axios.get('http://localhost:5000/api/stock_batches')
      .then(response => {
        setStockBatches(response.data);
        setSortedStockBatches(response.data);
      })
      .catch(error => {
        console.error('Error fetching stock batches:', error);
      });
  }, []);

  // Function to handle sorting by a specific column
  const handleSort = (columnName) => {
    const sorted = [...sortedStockBatches].sort((a, b) => {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
      return 0;
    });
    setSortedStockBatches(sorted);
  };

  // Function to handle searching
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredStockBatches = stockBatches.filter((batch) =>
      batch.product_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSortedStockBatches(filteredStockBatches);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search stock batches..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('product_name')}>Product Name</th>
            <th onClick={() => handleSort('quantity')}>Quantity</th>
            <th onClick={() => handleSort('expiration_date')}>Expiration Date</th>
            <th onClick={() => handleSort('buy_price')}>Buy Price</th>
            <th onClick={() => handleSort('purchase_date')}>Purchase Date</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {sortedStockBatches.map((batch) => (
            <tr key={batch.inventory_id}>
              <td>{batch.product_name}</td>
              <td>{batch.quantity}</td>
              <td>{batch.expiration_date}</td>
              <td>{batch.buy_price}</td>
              <td>{batch.purchase_date}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockBatchesTable;
