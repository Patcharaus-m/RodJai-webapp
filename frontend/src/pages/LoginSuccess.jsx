import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. ดึง Token จาก URL ที่ Backend ส่งมาให้
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // 2. เก็บ Token ลง localStorage
      localStorage.setItem('token', token);
      
      // 3. พายูสเซอร์ไปหน้า Home หรือ Dashboard
      setTimeout(() => {
        navigate('/home'); 
      }, 1500); // หน่วงเวลา 1.5 วิ เพื่อให้ยูสเซอร์เห็นว่าสำเร็จแล้ว
    } else {
      // ถ้าไม่มี Token ให้ตีกลับไปหน้า Login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2 className="text-success">Login Successful!</h2>
        <p>Redirecting you to RodJai Smart Farm...</p>
      </div>
    </div>
  );
}