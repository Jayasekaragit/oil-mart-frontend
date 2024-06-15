import React, { useState } from 'react';
import axios from 'axios';
import { useNotification } from '../NotificationContext';

const AddCategoryForm = () => {
  const [category, setCategory] = useState({ catergory_type: '' });
  const {addNotification} = useNotification();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/categories', category);
      console.log(response.data);
      addNotification('Catergory Added  successfully');
      // Reset form or handle success
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="form-container shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-3xl font-extrabold text-black">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category Type</label>
            <input
              name="catergory_type"
              type="text"
              value={category.catergory_type}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Category Type"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
