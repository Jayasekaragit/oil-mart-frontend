import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNotification } from '../NotificationContext';

const AddProductForm = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [product, setProduct] = useState({
    sub_cat_id: '',
    brand_id: '',
    p_name: '',
    size: '',
    sell_price: '',
    sku: '',
    min_stock_level: '',
    reorder_quantity: '',
    barcode: '',
  });
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subCategoriesResponse = await axios.get('http://localhost:5000/api/subcategories');
        setSubCategories(subCategoriesResponse.data);

        const brandsResponse = await axios.get('http://localhost:5000/api/brands');
        setBrands(brandsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleNumberInputChange = (e) => {
    // Prevent entering negative numbers
    if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === '+' || e.key === '-') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !product.sub_cat_id ||
      !product.brand_id ||
      !product.p_name ||
      !product.size ||
      !product.sell_price ||
      !product.sku ||
      !product.min_stock_level ||
      !product.reorder_quantity ||
      !product.barcode
    ) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', product);
      console.log(response.data);
      addNotification('Product added successfully');
      // Optionally reset the form after successful submission
      setProduct({
        sub_cat_id: '',
        brand_id: '',
        p_name: '',
        size: '',
        sell_price: '',
        sku: '',
        min_stock_level: '',
        reorder_quantity: '',
        barcode: '',
      });
    } catch (error) {
      alert('Error adding product:', error);
    }
  };

  return (
    <div className="max-w mx-auto m-10 overflow-auto">
      <div className="form-container shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-black">Add Product</h2>
        <form onSubmit={handleSubmit} className="flex p-3 m-3">
          {/* Form fields */}
          {/* Left Column */}
          <div className="p-4">
            {/* Sub Category */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Sub Category</label>
              <select
                name="sub_cat_id"
                value={product.sub_cat_id}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.sub_cat_id} value={subCategory.sub_cat_id}>
                    {subCategory.sub_cat_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Brand */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
              <select
                name="brand_id"
                value={product.brand_id}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input
                name="p_name"
                type="text"
                value={product.p_name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Product Name"
                required
              />
            </div>
            {/* Product Size */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Product Size</label>
              <input
                name="size"
                type="text"
                value={product.size}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Product size in L or kg"
                required
              />
            </div>
            {/* Sell Price */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Sell Price</label>
              <input
                name="sell_price"
                type="number"
                step="0.01"
                value={product.sell_price}
                onChange={handleChange}
                onKeyDown={handleNumberInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Sell Price"
                required
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="p-4">
            {/* SKU */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">SKU</label>
              <input
                name="sku"
                type="text"
                value={product.sku}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="SKU"
                required
              />
            </div>
            {/* Minimum Stock Level */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Minimum Stock Level</label>
              <input
                name="min_stock_level"
                type="number"
                value={product.min_stock_level}
                onChange={handleChange}
                onKeyDown={handleNumberInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Minimum Stock Level"
                required
              />
            </div>
            {/* Reorder Quantity */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Reorder Quantity</label>
              <input
                name="reorder_quantity"
                type="number"
                value={product.reorder_quantity}
                onChange={handleChange}
                onKeyDown={handleNumberInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Reorder Quantity"
                required
              />
            </div>
            {/* Barcode */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Barcode</label>
              <input
                name="barcode"
                type="text"
                value={product.barcode}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Barcode"
                required
              />
            </div>
          </div>
        </form>
        {/* Submit button */}
        <div className="flex items-center justify-between p-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
