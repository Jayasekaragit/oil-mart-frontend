import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [product, setProduct] = useState({
    sub_cat_id: '',
    brand_id: '',
    supplier_id: '',
    warehouse_id: '',
    p_name: '',
    size: '',
    sell_price: '',
    sku: '',
    min_stock_level: '',
    reorder_quantity: '',
    barcode: '',  // Added barcode field here
  });

  useEffect(() => {
    const fetchData = async () => {
      const subCategoriesResponse = await axios.get('http://localhost:5000/api/subcategories');
      setSubCategories(subCategoriesResponse.data);

      const brandsResponse = await axios.get('http://localhost:5000/api/brands');
      setBrands(brandsResponse.data);

      const suppliersResponse = await axios.get('http://localhost:5000/api/suppliers');
      setSuppliers(suppliersResponse.data);

      const warehousesResponse = await axios.get('http://localhost:5000/api/warehouses');
      setWarehouses(warehousesResponse.data);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products', product);
      console.log(response.data);
      // Reset form or handle success
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="max-w mx-auto m-10 overflow-auto">
      <div className="form-container shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-black">Add Product</h2>
        <form onSubmit={handleSubmit} className='flex p-3 m-3'>
          {/* Left Column */}
          <div className='p-4'>
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Supplier</label>
              <select
                name="supplier_id"
                value={product.supplier_id}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.supplier_id} value={supplier.supplier_id}>
                    {supplier.supplier_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Warehouse</label>
              <select
                name="warehouse_id"
                value={product.warehouse_id}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                    {warehouse.warehouse_name}
                  </option>
                ))}
              </select>
            </div>
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Sell Price</label>
              <input
                name="sell_price"
                type="number"
                step="0.01"
                value={product.sell_price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Sell Price"
                required
              />
            </div>
          </div>
          {/* Right Column */}
          <div className='p-4'>
            
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Minimum Stock Level</label>
              <input
                name="min_stock_level"
                type="number"
                value={product.min_stock_level}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Minimum Stock Level"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Reorder Quantity</label>
              <input
                name="reorder_quantity"
                type="number"
                value={product.reorder_quantity}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Reorder Quantity"
                required
              />
            </div>
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
