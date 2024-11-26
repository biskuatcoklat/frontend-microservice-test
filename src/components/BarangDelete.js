import React from 'react';
import axios from 'axios';

const BarangDelete = ({ id }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/barangs/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Barang deleted successfully!');
    } catch (error) {
      alert('Failed to delete barang.');
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default BarangDelete;
