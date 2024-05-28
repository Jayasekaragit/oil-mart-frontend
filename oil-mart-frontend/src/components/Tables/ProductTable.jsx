import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-black">
            <tr>
              <th className="w-1/4 py-2">Product ID</th>
              <th className="w-1/4 py-2">Product Name</th>
              <th className="w-1/4 py-2">Brand</th>
              <th className="w-1/4 py-2">Buy Price</th>
              <th className="w-1/4 py-2">Initial Stock</th>
              <th className="w-1/4 py-2">Current Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id} className="text-center border-b">
                <td className="py-2">{product.product_id}</td>
                <td className="py-2">{product.p_name}</td>
                <td className="py-2">{product.brand_name}</td>
                <td className="py-2">{product.buy_price}</td>
                <td className="py-2">{product.initial_stock}</td>
                <td className="py-2">{product.current_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
