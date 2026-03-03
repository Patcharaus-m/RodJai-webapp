import React, { useEffect } from 'react'; // Import useEffect [cite: 2026-03-04]
import { useNavigate } from 'react-router-dom'; // Import useNavigate [cite: 2026-03-04]

export default function LoginSuccess() {
  const navigate = useNavigate(); // ประกาศตัวแปร navigate เพื่อใช้งาน [cite: 2026-03-04]

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token'); // ดึง token จาก URL [cite: 2026-03-04]
    if (token) {
      localStorage.setItem('token', token); // เก็บลงเครื่อง [cite: 2026-03-04]
      navigate('/dashboard'); // สั่งให้เปลี่ยนหน้าไปที่ dashboard [cite: 2026-03-04]
    }
  }, [navigate]); // ใส่ navigate ใน dependency array เพื่อความถูกต้องตามหลัก React [cite: 2026-03-04]

  return <div>Logging you in, please wait...</div>;
}