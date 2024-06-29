import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotification } from '../NotificationContext';

const AddSubCategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState('');
  const [subCatName, setSubCatName] = useState('');
  const {addNotification} = useNotification();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/add-subcategory', { cat_id: catId, sub_cat_name: subCatName });
      alert('Subcategory added successfully');
      setCatId('');
      setSubCatName('');
      addNotification('Catergory Added  successfully');
    } catch (error) {
      console.error('Error adding subcategory:', error);
      alert('Failed to add subcategory');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="form-container shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-3xl font-extrabold text-white">Add Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.catergory_id} value={category.catergory_id}>
                  {category.catergory_type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCatName">
              Subcategory Name
            </label>
            <input
              id="subCatName"
              type="text"
              value={subCatName}
              onChange={(e) => setSubCatName(e.target.value)}
              placeholder="Subcategory Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategoryForm;
