import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
