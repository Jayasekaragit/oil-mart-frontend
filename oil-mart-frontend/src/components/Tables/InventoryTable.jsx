import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

const InventoryTable = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch inventory data from API
        axios.get('http://localhost:5000/api/inventory')
            .then(response => {
                const data = response.data;
                // Filter out rows with quantity 0 unless all rows for the same product have quantity 0
                const filteredData = filterInventoryData(data);
                setInventoryData(filteredData);
                setSortedData(filteredData); // Initialize sortedData with filtered data
            })
            .catch(error => {
                console.error('Error fetching inventory data:', error);
            });
    }, []);

    const filterInventoryData = (data) => {
        const productQuantities = data.reduce((acc, item) => {
            acc[item.product_id] = acc[item.product_id] || [];
            acc[item.product_id].push(item.quantity);
            return acc;
        }, {});

        return data.filter(item => {
            const quantities = productQuantities[item.product_id];
            const allZero = quantities.every(qty => qty === 0);
            return allZero || item.quantity > 0;
        });
    };

    // Handle sorting of inventory data
    const handleSort = (field) => {
        const sorted = [...sortedData].sort((a, b) => {
            const fieldA = a[field].toString().toLowerCase(); // Convert to string and lowercase
            const fieldB = b[field].toString().toLowerCase(); // Convert to string and lowercase
            return fieldA.localeCompare(fieldB);
        });
        setSortedData(sorted);
    };
    

    // Handle search term change
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filteredData = inventoryData.filter(item =>
            Object.values(item).some(value =>
                value.toString().toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
        setSortedData(filteredData);
    };

    // Apply conditional Tailwind CSS classes based on the number of units
    const getRowClasses = (quantity) => {
        if (quantity === 0) {
            return 'bg-red-100'; // Changed from 'bg-red-700' to 'bg-red-100'
        } else if (quantity < 5) {
            return 'bg-yellow-100';
        } else {
            return '';
        }
    };

    

  
const downloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set the document title
    doc.text('Inventory Report', 10, 10);

    // Define starting y position for the table
    let yPos = 20;

    // Define table headers
    const headers = Object.keys(sortedData[0]);

    // Define table data
    const data = sortedData.map(item => Object.values(item));

    // Generate table headers
    doc.autoTable({
        startY: yPos,
        head: [headers],
    });

    // Generate table data
    doc.autoTable({
        startY: yPos + 10, // Adjust starting position
        body: data,
    });

    // Save the PDF as "inventory_report.pdf"
    doc.save('inventory_report.pdf');
};

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-300 p-2 mb-4 rounded-md w-full"
            />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th onClick={() => handleSort('product_name')} className="px-4 py-2 cursor-pointer w-1/6 font-semibold text-gray-700">Product Name</th>
                            <th onClick={() => handleSort('sell_price')} className="px-4 py-2 cursor-pointer w-1/6 font-semibold text-gray-700">Selling Price</th>
                            <th onClick={() => handleSort('buy_price')} className="px-4 py-2 cursor-pointer w-1/6 font-semibold text-gray-700">Buying Price</th>
                            <th onClick={() => handleSort('quantity')} className="px-4 py-2 cursor-pointer w-1/6 font-semibold text-gray-700">No of Units</th>
                            <th onClick={() => handleSort('brand_name')} className="px-4 py-2 cursor-pointer w-1/6 font-semibold text-gray-700">Brand</th>
                            <th onClick={() => handleSort('sub_cat_name')} className="px-4 py-2 cursor-pointer w-1/6 font-semibold text-gray-700">Category</th>
                            <th className="px-4 py-2 w-1/6 font-semibold text-gray-700">Supplier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map(item => (
                            <tr key={item.inventory_id} className={`text-sm border-t border-gray-300 ${getRowClasses(item.quantity)}`}>
                                <td className="px-4 py-2">{item.product_name}</td>
                                <td className="px-4 py-2">{item.sell_price}</td>
                                <td className="px-4 py-2">{item.buy_price}</td>
                                <td className="px-4 py-2">{item.quantity}</td>
                                <td className="px-4 py-2">{item.brand_name}</td>
                                <td className="px-4 py-2">{item.sub_cat_name}</td>
                                <td className="px-4 py-2">{item.supplier_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={downloadPDF} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download PDF</button>
        </div>
    );
};

export default InventoryTable;
