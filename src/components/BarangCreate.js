import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarangCreate = () => {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [kategori, setKategori] = useState([]); // Inisialisasi sebagai array kosong
  const [selectedKategori, setSelectedKategori] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/kategori', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Koreksi tanda titik koma
      });
      console.log('Response Kategori:', response.data); // Debugging
      setKategori(response.data.data || []);
      const kategoriList = response.data.map((kategori) => ({
        id: kategori.id,
        nama: kategori.nama,
      }));
      setKategori(kategoriList);
    } catch (error) {
      console.error('Error fetching kategori:', error);
      setKategori([]);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/barangs/post',
        { nama, harga, kategori_id: selectedKategori },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setMessage('Barang created successfully!');
    } catch (error) {
      setMessage('Failed to create barang.');
    }
  };

  return (
    <div>
      <h2>Create Barang</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          required
        />
        <select
          value={selectedKategori}
          onChange={(e) => setSelectedKategori(e.target.value)}
          required
        >
          <option value="" disabled>
            Pilih Kategori
          </option>
          {kategori.length > 0 ? (
            kategori.map((kat) => (
              <option key={kat.id} value={kat.id}>
                {kat.nama}
              </option>
            ))
          ) : (
            <option disabled>Data kategori tidak tersedia</option>
          )}
        </select>


        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BarangCreate;
