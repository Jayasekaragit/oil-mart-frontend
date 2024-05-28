import React, { useState } from 'react';
import axios from 'axios';

const AddBrandForm = () => {
  const [brand, setBrand] = useState({ brand_name: '' });

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/brands', brand);
      console.log(response.data);
      // Reset form or handle success
    } catch (error) {
      console.error('Error adding brand:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="form-container shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-3xl font-extrabold text-black">Add Brand</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Brand Name</label>
            <input
              name="brand_name"
              type="text"
              value={brand.brand_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Brand Name"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrandForm;
