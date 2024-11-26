import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Menambahkan useNavigate

const BarangList = () => {
  const [barangs, setBarangs] = useState([]);
  const [kategori, setKategori] = useState([]); // Inisialisasi sebagai array kosong
  const navigate = useNavigate(); // Menambahkan useNavigate

  // Mengambil data kategori dan barang
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil kategori
        const kategoriResponse = await axios.get('http://127.0.0.1:8000/api/kategori', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setKategori(kategoriResponse.data);

        // Mengambil barang
        const barangResponse = await axios.get('http://127.0.0.1:8000/api/barangs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBarangs(barangResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Menampilkan nama kategori berdasarkan id
  const getKategoriName = (id) => {
    const foundKategori = kategori.find((kat) => kat.id === id);
    return foundKategori ? foundKategori.nama : 'Kategori tidak ditemukan';
  };

  // Fungsi untuk handle update
  const handleUpdate = (id) => {
    // Mengarahkan ke halaman update dengan id barang
    navigate(`/barang/update/${id}`);
  };

  // Fungsi untuk handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus barang ini?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/barangs/delete/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBarangs(barangs.filter((barang) => barang.id !== id)); // Menghapus barang dari state
        alert('Barang berhasil dihapus');
      } catch (error) {
        console.error('Error deleting barang:', error);
        alert('Gagal menghapus barang');
      }
    }
  };

  return (
    <div>
      <h2>Barang List</h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barangs.map((barang) => (
            <tr key={barang.id}>
              <td>{barang.nama}</td>
              <td>{barang.harga}</td>
              <td>{getKategoriName(barang.kategori_id)}</td>
              <td>
                <button onClick={() => handleUpdate(barang.id)}>Update</button>
                <button onClick={() => handleDelete(barang.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarangList;
