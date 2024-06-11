import React, { useState, useEffect } from "react";
import axios from "axios";

const StockForm = () => {
  const [products, setProducts] = useState([]);
  const [grades, setGrades] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    product_id: "",
    supplier_id: "",
    quantity: "",
    pack_size: "",
    sae_name: null,
    expiration_date: "",
    buy_price: "",
    purchase_date: "",
    barcode: "",	
  });

  useEffect(() => {
    // Fetch products from the backend
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    axios
      .get("http://localhost:5000/api/sae_grades")
      .then((response) => {
        setGrades(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    axios
      .get("http://localhost:5000/api/suppliers")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/stock", formData)
      .then((response) => {
        console.log(response.data);
        // Handle success (e.g., display a success message, clear the form, etc.)
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
      });
  };

  return (
    <div className="max-w mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row p-6 m-4">
          <div className="basis-1/2 p-6 bg-red-200">
          <div className="mb-4">
          <label className="block text-gray-700">Product</label>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.p_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">SAE Grade</label>
          <select
            name="sae_name"
            value={formData.sae_name}
            defaultValue={null}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="NULL">Select a product</option>
            {grades.map((grade) => (
              <option key={grade.sae_id} value={grade.sae_id}>
                {grade.sae_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Supplier</label>
          <select
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a product</option>
            {suppliers.map((supplier) => (
              <option key={supplier.supplier_id} value={supplier.supplier_id}>
                {supplier.supplier_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700">Barcode</label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div> */}
          </div>
        <div className="basis-1/2 p-6 bg-red-100">
              
        {/* <div className="mb-4">
          <label className="block text-gray-700">Pack Size</label>
          <input
            type="number"
            name="pack_size"
            value={formData.pack_size}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700">Expiration Date</label>
          <input
            type="date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Buying Price</label>
          <input
            type="number"
            name="buy_price"
            value={formData.buy_price}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Purchase Date</label>
          <input
            type="date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Add Stock
        </button>
        </div>
       

        
      </div>
      </form>
    </div>
  );
};

export default StockForm;
