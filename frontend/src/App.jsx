// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      {/* กำหนดว่าถ้าเข้ามาหน้าแรก (/) ให้แสดงหน้า Welcome */}
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* อนาคตถ้ามีหน้า Login หรือ Dashboard ก็มาเพิ่มตรงนี้ */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default App;