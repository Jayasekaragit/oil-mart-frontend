import React, { useState } from 'react';
import axios from 'axios';
import './InventoryReport.css'; // Make sure to create and include any custom CSS for styling

const InventoryReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeEmptyStocks, setIncludeEmptyStocks] = useState(false);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/inventory/report', {
        responseType: 'blob', // Important to handle binary data
        params: {
          startDate,
          endDate,
          includeEmptyStocks
        }
      });

      // Create a URL for the PDF blob and open it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventory_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="inventory-report">
      <h1>Generate Inventory Report</h1>
      <form onSubmit={e => { e.preventDefault(); handleGenerateReport(); }}>
        <div className="form-group">
          <label>Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={includeEmptyStocks}
              onChange={e => setIncludeEmptyStocks(e.target.checked)}
            />
            Include Only Empty Stocks
          </label>
        </div>
        <button type="submit" className="generate-report-button">Generate Report</button>
      </form>
    </div>
  );
};

export default InventoryReport;
