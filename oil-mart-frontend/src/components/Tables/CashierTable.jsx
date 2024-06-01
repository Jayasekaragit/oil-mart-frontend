import React, { useState, useEffect } from 'react';

const CashierTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/cashier/products');
        const data = await response.json();
        console.log('Products data:', data); // Log the data received from the backend
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Point of Sale</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md">
          <thead>
            <tr className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Brand Name</th>
              <th className="py-3 px-6 text-left">Item Type </th>
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              {/* Add more attributes here as needed */}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product) => (
              <tr key={product.product_id} className="border-b">
                <td className="py-3 px-6 text-left">{product.brand_name}</td>
                <td className="py-3 px-6 text-left">{product.sub_cat_name}</td>
                <td className="py-3 px-6 text-left">{product.product_name}</td>
                <td className="py-3 px-6 text-left">${product.sell_price.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{product.total_quantity}</td>
                {/* Add more table cells for additional attributes */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashierTable;
