import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for the modal

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
    buy_price: '',
    initial_stock: '',
    current_stock: '',
    sku: '',
    min_stock_level: '',
    reorder_quantity: '',
  });
  const [barcodes, setBarcodes] = useState([]);
  const [barcodeIndex, setBarcodeIndex] = useState(0);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [currentBarcode, setCurrentBarcode] = useState('');

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
    setIsBarcodeModalOpen(true);
  };

  const handleBarcodeSubmit = async () => {
    const newBarcodes = [...barcodes, currentBarcode];
    setBarcodes(newBarcodes);
    setCurrentBarcode('');
    if (newBarcodes.length === parseInt(product.initial_stock, 10)) {
      setIsBarcodeModalOpen(false);
      try {
        const response = await axios.post('http://localhost:5000/api/products', { ...product, barcodes: newBarcodes });
        console.log(response.data);
        // Reset form or handle success
      } catch (error) {
        console.error('Error adding product:', error);
      }
    } else {
      setBarcodeIndex(barcodeIndex + 1);
    }
  };

  return (
    <div className="max-w mx-auto m-10 overflow-auto">
      <div className="form-container shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-black">Add Product</h2>
        <form onSubmit={handleSubmit} className='flex p-3 m-3'>
          {/* Sub Category */}
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
            {/* Supplier */}
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
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.supplier_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Warehouse */}
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
            {/* Buy Price */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Buy Price</label>
              <input
                name="buy_price"
                type="number"
                step="0.01"
                value={product.buy_price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Buy Price"
                required
              />
            </div>
          </div>
          {/* Right Column */}
          <div className='p-4'>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Initial Stock</label>
              <input
                name="initial_stock"
                type="number"
                value={product.initial_stock}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Initial Stock"
                required
              />
            </div>
            {/* Current Stock */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Current Stock</label>
              <input
                name="current_stock"
                type="number"
                value={product.current_stock}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Current Stock"
                required
              />
            </div>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Reorder Quantity"
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

      <Modal
        isOpen={isBarcodeModalOpen}
        onRequestClose={() => setIsBarcodeModalOpen(false)}
        contentLabel="Enter Barcode"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
      >
        <h2 className="text-2xl mb-4">Enter Barcode {barcodeIndex + 1}</h2>
        <input
          name="barcode"
          type="text"
          value={currentBarcode}
          onChange={(e) => setCurrentBarcode(e.target.value)}
          className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={`Barcode ${barcodeIndex + 1}`}
          required
        />
        <button
          onClick={handleBarcodeSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Submit Barcode
        </button>
      </Modal>
    </div>
  );
};

export default AddProductForm;
