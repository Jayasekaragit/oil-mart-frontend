import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear local storage or any other storage mechanism
      localStorage.clear();
      // Redirect to login page or home page
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-3 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none"
    >
      Logout
    </button>
  );
}

export default Logout;
