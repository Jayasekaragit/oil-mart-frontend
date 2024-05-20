// UpdateUserModal.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserModal = ({ user, onUpdate, onClose }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(user.id, formData);
        onClose();
    };
    const updateUser = async (userId, updatedUserData) => {
      try {
          // Make API request to update user data
          const response = await axios.put(`http://localhost:5000/admin/users/${userId}`, updatedUserData);
          console.log('User updated successfully:', response.data);
          // Optionally, you can update the user data in your frontend state here
      } catch (error) {
          console.error('Error updating user:', error);
          // Handle error
      }
  };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
                    <div className="p-4">
                        <button
                            className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-600 focus:outline-none"
                            onClick={onClose}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Update User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full border rounded-md py-2 px-3 text-sm text-gray-800"
                                    placeholder="User Name"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-md py-2 px-3 text-sm text-gray-800"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border rounded-md py-2 px-3 text-sm text-gray-800"
                                    placeholder="Role"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border rounded-md py-2 px-3 text-sm text-gray-800"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
