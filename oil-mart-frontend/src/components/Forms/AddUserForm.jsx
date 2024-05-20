import React, { useState } from 'react';

const AddUserForm = ({ setFormData, handleSubmit, formData }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear validation error for the field
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validate = () => {
        let tempErrors = {};
        let valid = true;

        if (!formData.username) {
            tempErrors.username = "Username is required.";
            valid = false;
        }
        if (!formData.email) {
            tempErrors.email = "Email is required.";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is not valid.";
            valid = false;
        }
        if (!formData.password) {
            tempErrors.password = "Password is required.";
            valid = false;
        } else if (formData.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters long.";
            valid = false;
        }
        if (!formData.role) {
            tempErrors.role = "Role is required.";
            valid = false;
        }
        if (!formData.phone) {
            tempErrors.phone = "Phone number is required.";
            valid = false;
        } else if (!/^\d{10}$/.test(formData.phone)) {
            tempErrors.phone = "Phone number must be 10 digits.";
            valid = false;
        }

        setErrors(tempErrors);
        return valid;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            handleSubmit(event);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleFormSubmit}>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New User</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                        Role
                    </label>
                    <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select a Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Cashier">Cashier</option>
                        <option value="Inventory_Manager">Inventory Manager</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-xs italic">{errors.role}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUserForm;
