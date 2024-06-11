import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const SalesReport = ({ reportType }) => {
    const [report, setReport] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/sales/${reportType}`)
            .then(response => {
                setReport(response.data);
            })
            .catch(error => {
                console.error('Error fetching the sales report:', error);
            });
    }, [reportType]);

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Sales Report`, 14, 16);
        
        const columns = [
            { header: 'Product Name', dataKey: 'product_name' },
            { header: 'Selling Price', dataKey: 'selling_price' },
            { header: 'Buying Price', dataKey: 'buying_price' },
            { header: 'Total Quantity Sold', dataKey: 'total_quantity_sold' },
            { header: 'Total Revenue', dataKey: 'total_revenue' },
            { header: 'Total Cost', dataKey: 'total_cost' },
            { header: 'Total Profit', dataKey: 'total_profit' },
            { header: reportType === 'weekly' ? 'Sales Week' : 'Sales Date', dataKey: reportType === 'weekly' ? 'sales_week' : 'sales_date' }
        ];

        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: report.map(row => columns.map(col => row[col.dataKey])),
            startY: 20,
        });

        doc.save(`${reportType}_sales_report.pdf`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Sales Report</h1>
            <button 
                onClick={generatePDF} 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Download PDF
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Product Name</th>
                            <th className="py-3 px-6 text-left">Selling Price</th>
                            <th className="py-3 px-6 text-left">Buying Price</th>
                            <th className="py-3 px-6 text-left">Total Quantity Sold</th>
                            <th className="py-3 px-6 text-left">Total Revenue</th>
                            <th className="py-3 px-6 text-left">Total Cost</th>
                            <th className="py-3 px-6 text-left">Total Profit</th>
                            <th className="py-3 px-6 text-left">{reportType === 'weekly' ? 'Sales Week' : 'Sales Date'}</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {report.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{item.product_name}</td>
                                <td className="py-3 px-6 text-left">{item.selling_price}</td>
                                <td className="py-3 px-6 text-left">{item.buying_price}</td>
                                <td className="py-3 px-6 text-left">{item.total_quantity_sold}</td>
                                <td className="py-3 px-6 text-left">{item.total_revenue}</td>
                                <td className="py-3 px-6 text-left">{item.total_cost}</td>
                                <td className="py-3 px-6 text-left">{item.total_profit}</td>
                                <td className="py-3 px-6 text-left">{reportType === 'weekly' ? item.sales_week : item.sales_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReport;
