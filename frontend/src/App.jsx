// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import LoginSuccess from './components/Login/LoginSuccess';
import AddDevice from './pages/AddDevice';

function App() {
  return (
    <Routes>
      {/* กำหนดว่าถ้าเข้ามาหน้าแรก (/) ให้แสดงหน้า Welcome */}
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/add-device" element={<AddDevice />} />
    </Routes>
  );
}

export default App;