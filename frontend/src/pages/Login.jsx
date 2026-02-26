// src/pages/Login.jsx
import React, { useState } from 'react'; 
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

// ดึง Component เดิมที่เคยสร้างไว้มาใช้งานได้เลย 
import IconInput from '../components/Register/IconInput';
import SocialButton from '../components/Register/SocialButton';
import Divider from '../components/Register/Divider';

export default function Login() {
  const navigate = useNavigate();

  // 1. สร้าง State เก็บข้อมูล Login
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // 2. ฟังก์ชันจัดการการพิมพ์
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. ฟังก์ชันส่งข้อมูลไป Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ยิง API ไปที่ Path Login
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: formData.email, 
        password: formData.password
      });

      // 4. ดึงข้อมูลจาก payload ตามที่ Backend ส่งมา
      const token = response.data?.payload?.token; 
      const user = response.data?.payload?.user;
      
      if (token) {
        // เก็บ Token ไว้ใน LocalStorage เพื่อให้แอปจำได้ว่า Login แล้ว
        localStorage.setItem('token', token);
        
        // แสดงชื่อผู้ใช้ตอน Login สำเร็จ (ดึงมาจาก user.username)
        alert(`Login Successful! Welcome back, ${user?.username || 'User'}`);
        
        // TODO: Login เสร็จแล้วให้ไปหน้าหลัก (ปลดคอมเมนต์เมื่อมีหน้า Dashboard/Todo แล้ว)
        // navigate('/dashboard'); 
      } else {
        alert("Login failed: No token received");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ background: 'linear-gradient(to bottom, #f8faf4, #f4f7ef)' }}>
      
      <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm w-100 border-0 my-auto" style={{ maxWidth: '420px' }}>
        
        {/* Header Section */}
        <div className="text-center mb-4">
          <div className="d-inline-flex justify-content-center align-items-center rounded-circle bg-light p-3 mb-3" style={{ color: '#a3d665' }}>
            <i className="bi bi-tractor" style={{ fontSize: '1.5rem' }}></i>
          </div>
          <h2 className="fw-bold text-dark">Welcome Back!</h2>
          <p className="text-muted">Login to manage your farm.</p>
        </div>

        {/* Social Buttons */}
        <SocialButton icon="bi-line" text="Login with Line" bgColor="#00C300" textColor="white" />
        <SocialButton icon="bi-google" text="Login with Google" variant="outline-secondary" iconColor="text-danger" />

        <Divider text="OR CONTINUE WITH EMAIL" />

        {/* Form Section */}
        <Form onSubmit={handleSubmit}>
          
          <IconInput 
            icon="bi-envelope-fill" 
            type="email" 
            placeholder="Email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          <IconInput 
            icon="bi-lock-fill" 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-100 py-3 rounded-pill fw-bold shadow-sm mt-2" 
            style={{ backgroundColor: '#a3d665', border: 'none', fontSize: '1.1rem', color: '#1c2434' }}
          >
            Login →
          </Button>
        </Form>

        {/* Footer */}
        <div className="text-center mt-4 text-muted" style={{ fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <span className="fw-bold" style={{ color: '#a3d665', cursor: 'pointer' }} onClick={() => navigate('/register')}>
            Sign Up
          </span>
        </div>

      </div>
    </Container>
  );
}