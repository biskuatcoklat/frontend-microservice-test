import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarangUpdate = ({ id, currentNama, currentHarga, currentKategoriId }) => {
  const [nama, setNama] = useState(currentNama || ''); // Default value empty string
  const [harga, setHarga] = useState(currentHarga || 0); // Default value 0
  const [kategoriId, setKategoriId] = useState(currentKategoriId || ''); // Default empty string
  const [kategoris, setKategoris] = useState([]); // State untuk kategori

  useEffect(() => {
    fetchKategoris();
  }, []);

  const fetchKategoris = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/kategori', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setKategoris(response.data.data);
    } catch (error) {
      console.error('Failed to fetch kategoris:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/barangs/update/${id}`,
        { nama, harga, kategori_id: kategoriId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Barang updated successfully!');
    } catch (error) {
      alert('Failed to update barang.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />
      <input
        type="number"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        required
      />
      <select
        value={kategoriId || ''}
        onChange={(e) => setKategoriId(e.target.value)}
        required
      >
        <option value="" disabled>Pilih Kategori</option>
        {kategoris && kategoris.length > 0 ? (
          kategoris.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.nama}
            </option>
          ))
        ) : (
          <option disabled>Loading...</option>
        )}
      </select>

      <button type="submit">Update</button>
    </form>
  );
};

export default BarangUpdate;
