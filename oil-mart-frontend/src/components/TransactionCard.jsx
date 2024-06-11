import React from 'react';
import jsPDF from 'jspdf';

const TransactionCard = (props) => {
  const totalCashReceived = props.transaction.transaction_items.reduce((acc, item) => acc + item.cash, 0);
  const totalTransactionPrice = props.transaction.transaction_items.reduce((acc, item) => acc + item.total_price, 0);
  const change = totalCashReceived - totalTransactionPrice;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Report', 10, 10);
    let y = 20;
    props.transaction.transaction_items.forEach((item, index) => {
      doc.text(`Product: ${item.product_name}`, 10, y);
      doc.text(`Unit Price: Rs. ${item.price.toFixed(2)}`, 50, y);
      doc.text(`Quantity: ${item.quantity}`, 100, y);
      doc.text(`Total: Rs. ${item.total_price.toFixed(2)}`, 150, y);
      y += 10;
    });
    doc.text(`Total Transaction Price: Rs. ${totalTransactionPrice.toFixed(2)}`, 10, y + 10);
    doc.text(`Total Cash Received: Rs. ${totalCashReceived.toFixed(2)}`, 10, y + 20);
    doc.text(`Change: Rs. ${change.toFixed(2)}`, 10, y + 30);
    doc.save('sales_report.pdf');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">Receipt</h2>
      <p className="text-gray-600 mb-4 text-center">Transaction ID: {props.transaction.transaction_id}</p>
      <ul className="divide-y divide-gray-200">
        {props.transaction.transaction_items.map((item, index) => (
          <li key={index} className="flex py-2">
            <div className="w-2/3">
              <p className="font-semibold">{item.product_name}</p>
              <p className="text-gray-600">Unit Price:  Rs. {item.price.toFixed(2)}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="w-1/3 text-right">
              <p className="font-semibold">Total: Rs. {item.total_price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-4">
        <p className="font-semibold">Total: Rs. {totalTransactionPrice.toFixed(2)}</p>
      </div>
      <div className="flex justify-end mt-2">
        <p className="font-semibold">Cash Received: Rs. {totalCashReceived.toFixed(2)}</p>
      </div>
      <div className="flex justify-end mt-2">
        <p className="font-semibold">Change: Rs. {change.toFixed(2)}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
