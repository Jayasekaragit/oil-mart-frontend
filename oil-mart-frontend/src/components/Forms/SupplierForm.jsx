import React, { useState } from 'react';
import axios from 'axios';

import { useNotification } from '../NotificationContext';

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    s_name: '',
    contact_info: '',
    supplier_loc: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {addNotification} = useNotification();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    axios.post('http://localhost:5000/api/suppliers', formData)
      .then(response => {
        setSuccessMessage('Supplier added successfully!');
        addNotification('Supplier added successfully');
        setFormData({ s_name: '', contact_info: '', supplier_loc:'' }); // Clear form after submission
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
        setErrorMessage('There was an error submitting the form.');
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Supplier</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Supplier Name</label>
          <input
            type="text"
            name="s_name"
            value={formData.s_name}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Supplier Location</label>
          <input
            type="text"
            name="supplier_loc"
            value={formData.supplier_loc}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact Information</label>
          <input
            type="text"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Add Supplier</button>
      </form>
    </div>
  );
};

export default SupplierForm;
