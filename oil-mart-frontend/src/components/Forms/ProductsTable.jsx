import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNotification } from '../NotificationContext';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {addNotification} = useNotification();

  useEffect(() => {
    // Fetch products data from the API
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdateFormSubmit = (updatedProduct) => {
    // Send update request to the backend
    axios.put(`http://localhost:5000/api/products/${updatedProduct.product_id}`, updatedProduct)
      .then(response => {
        // Update the products state with the updated product
        const updatedProducts = products.map(product =>
          product.product_id === updatedProduct.product_id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        addNotification('Product details changed successfully');
        setSelectedProduct(null); // Clear the selected product
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Product ID</th>
            <th className="text-left py-3 px-4">Product Name</th>
            <th className="text-left py-3 px-4">Size</th>
            <th className="text-left py-3 px-4">Sell Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(product)}>
              <td className="py-3 px-4">{product.product_id}</td>
              <td className="py-3 px-4">{product.p_name}</td>
              <td className="py-3 px-4">{product.size}</td>
              <td className="py-3 px-4">{product.sell_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && (
        <UpdateForm product={selectedProduct} onSubmit={handleUpdateFormSubmit} />
      )}
    </div>
  );
};

const UpdateForm = ({ product, onSubmit }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedProduct);
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold mb-2">Update Product</h3>
      <label className="block mb-2">
        Product Name:
        <input type="text" name="p_name" value={updatedProduct.p_name} onChange={handleChange} className="block border border-gray-300 rounded-md p-2 mt-1 w-full" />
      </label>
      <label className="block mb-2">
        Size:
        <input type="number" name="size" value={updatedProduct.size} onChange={handleChange} className="block border border-gray-300 rounded-md p-2 mt-1 w-full" />
      </label>
      <label className="block mb-2">
        Sell Price:
        <input type="text" name="sell_price" value={updatedProduct.sell_price} onChange={handleChange} className="block border border-gray-300 rounded-md p-2 mt-1 w-full" />
      </label>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
    </form>
  );
};

export default ProductsTable;
