import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
   
    localStorage.removeItem('token'); 

    
    navigate('/');
  };

  return (
    <div className="text-center mt-8">
      <h2 className="font-extrabold text-2xl">Are you sure you want to log out?</h2>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
