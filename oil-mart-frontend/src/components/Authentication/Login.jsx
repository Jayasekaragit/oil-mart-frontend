import React, { useState } from 'react';
import './SignupForm.css';
import axios from 'axios';
import { useNotification } from '../NotificationContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addNotification } = useNotification();
  const [errors, setErrors] = useState({});

  // Function to validate form fields
  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    if (password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
      const { token, role, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', user);

      // Redirect based on role
      if (role === 'Admin') {
        window.location.href = '/admin/dashboard';
        addNotification(`Login Successful: Admin ${user}`);
      } else if (role === 'Cashier') {
        window.location.href = '/cashier/dashboard';
        addNotification(`Login Successful: Cashier ${user}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="form-container shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 bg-white">
        <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-6">Oil Mart</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={`block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={`block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          {/* Submit Button */}
          <button type="submit" className="block w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
