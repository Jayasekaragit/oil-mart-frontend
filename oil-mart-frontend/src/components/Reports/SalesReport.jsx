import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const SalesReport = ({ reportType }) => {
    const [creditSales, setCreditSales] = useState([]);
    const [normalSales, setNormalSales] = useState([]);
    
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/api/sales/${reportType}`)
            .then(response => {
                const creditSalesData = response.data.filter(item => item.is_credit_sale);
                const normalSalesData = response.data.filter(item => !item.is_credit_sale);
                setCreditSales(creditSalesData);
                setNormalSales(normalSalesData);
            })
            .catch(error => {
                console.error('Error fetching the sales report:', error);
            });
    }, [reportType]);

    const generatePDF = () => {
        const doc = new jsPDF('p', 'pt');

        // Add a title and some branding
        doc.setFontSize(22);
        doc.text('Sales Report', 40, 40);
        doc.setFontSize(14);
        doc.text(`Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`, 40, 60);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, 80);

        const columns = [
            { header: 'Product Name', dataKey: 'product_name' },
            { header: 'Selling Price', dataKey: 'selling_price' },
            { header: 'Buying Price', dataKey: 'buying_price' },
            { header: 'Total Revenue', dataKey: 'total_revenue' },
            { header: 'Total Cost', dataKey: 'total_cost' },
            { header: 'Total Profit', dataKey: 'total_profit' },
            { header: 'Discount (%)', dataKey: 'discount' },
            { header: reportType === 'weekly' ? 'Sales Week' : 'Sales Date', dataKey: reportType === 'weekly' ? 'sales_week' : 'sales_date' }
        ];

        doc.setFontSize(16);
        doc.text('Normal Sales Report', 40, 120);

        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: normalSales.map(row => columns.map(col => {
                if (col.dataKey === 'sales_date') {
                    return formatDate(row[col.dataKey]); // Format date as YYYY-MM-DD
                }
                return row[col.dataKey];
            })),
            startY: 140,
            theme: 'grid',
            headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255], fontSize: 12 },
            bodyStyles: { fillColor: [245, 245, 245] },
            alternateRowStyles: { fillColor: [255, 255, 255] },
            margin: { top: 10, left: 40, right: 40, bottom: 10 },
            styles: { fontSize: 10, overflow: 'linebreak' },
        });

        const totalRevenue = normalSales.reduce((sum, item) => sum + parseFloat(item.total_revenue), 0);
        const totalCost = normalSales.reduce((sum, item) => sum + parseFloat(item.total_cost), 0);
        const totalProfit = normalSales.reduce((sum, item) => sum + parseFloat(item.total_profit), 0);
        const averageDiscount = normalSales.length > 0 ? normalSales.reduce((sum, item) => sum + parseFloat(item.discount), 0) / normalSales.length : 0;

        doc.setFontSize(14);
        const summaryStartY = doc.lastAutoTable.finalY + 20;
        doc.text(`Summary:`, 40, summaryStartY);
        doc.text(`Total Revenue: Rs. ${totalRevenue.toFixed(2)}`, 40, summaryStartY + 20);
        doc.text(`Total Cost: Rs. ${totalCost.toFixed(2)}`, 40, summaryStartY + 40);
        doc.text(`Total Profit: Rs. ${totalProfit.toFixed(2)}`, 40, summaryStartY + 60);
        doc.text(`Average Discount: ${averageDiscount.toFixed(2)}%`, 40, summaryStartY + 80);

        doc.save(`${reportType}_sales_report.pdf`);
    };

    const renderTable = (title, data) => (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Product Name</th>
                        <th className="py-3 px-6 text-left">Selling Price</th>
                        <th className="py-3 px-6 text-left">Buying Price</th>
                        <th className="py-3 px-6 text-left">Total Revenue</th>
                        <th className="py-3 px-6 text-left">Total Cost</th>
                        <th className="py-3 px-6 text-left">Total Profit</th>
                        <th className="py-3 px-6 text-left">Discount (%)</th>
                        <th className="py-3 px-6 text-left">{reportType === 'weekly' ? 'Sales Week' : 'Sales Date'}</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">{item.product_name}</td>
                            <td className="py-3 px-6 text-left">{item.selling_price}</td>
                            <td className="py-3 px-6 text-left">{item.buying_price}</td>
                            <td className="py-3 px-6 text-left">{item.total_revenue}</td>
                            <td className="py-3 px-6 text-left">{item.total_cost}</td>
                            <td className="py-3 px-6 text-left">{item.total_profit}</td>
                            <td className="py-3 px-6 text-left">{item.discount}</td>
                            <td className="py-3 px-6 text-left">{reportType === 'weekly' ? item.sales_week : formatDate(item.sales_date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <h2 className="text-xl font-bold">Summary</h2>
                <p>Total Revenue: Rs. {data.reduce((sum, item) => sum + parseFloat(item.total_revenue), 0).toFixed(2)}</p>
                <p>Total Cost: Rs. {data.reduce((sum, item) => sum + parseFloat(item.total_cost), 0).toFixed(2)}</p>
                <p>Total Profit: Rs. {data.reduce((sum, item) => sum + parseFloat(item.total_profit), 0).toFixed(2)}</p>
                <p>Average Discount: {data.length > 0 ? (data.reduce((sum, item) => sum + parseFloat(item.discount), 0) / data.length).toFixed(2) : 0}%</p>
            </div>
        </div>
    );

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
                {renderTable('Normal Sales', normalSales)}
                {renderTable('Credit Sales', creditSales)}
            </div>
        </div>
    );
};

export default SalesReport;
