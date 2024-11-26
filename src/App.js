import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import BarangList from './components/BarangList';
import BarangCreate from './components/BarangCreate';
import BarangDelete from './components/BarangDelete';
import Logout from './components/Logout';
import BarangUpdate from './components/BarangUpdate';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/barang/create">Create Barang</Link>
          </li>
          <li>
            <Link to="/barang">Barang List</Link>
          </li>
          <li>
            <Link to="/barang/update/:id">Barang Update</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/barang/create" element={<BarangCreate />} />
        <Route path="/barang/update/:id" element={<BarangUpdate />} />
        <Route path="/barang" element={<BarangList />} />
        <Route path="/barang/delete/:id" element={<BarangDelete />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
