import React, { useState } from 'react';
import './SignupForm.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
      const { token, role } = response.data;

   
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on role
      if (role === 'Admin') {
      
        window.location.href = '/admin';
      } else if (role === 'Cashier') {

        window.location.href = '/products';
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="form-container shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-3xl font-extrabold text-white">Oil Mart</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
