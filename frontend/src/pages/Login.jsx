// src/pages/Login.jsx
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// ดึง Component เดิมที่เคยสร้างไว้มาใช้งานได้เลย 
// (ถ้าโฟลเดอร์ชื่อ Register ก็อ้างอิงตามนี้ได้เลยครับ หรือถ้าเปลี่ยนชื่อโฟลเดอร์ก็แก้ Path นิดหน่อย)
import IconInput from '../components/Register/IconInput';
import SocialButton from '../components/Register/SocialButton';
import Divider from '../components/Register/Divider';

export default function Login() {
  const navigate = useNavigate();

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ background: 'linear-gradient(to bottom, #f8faf4, #f4f7ef)' }}>
      
      {/* กล่อง Card สีขาวแบบเดียวกับหน้า Register */}
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
        <SocialButton 
          icon="bi-line" 
          text="Login with Line" 
          bgColor="#00C300" 
          textColor="white" 
        />
        <SocialButton 
          icon="bi-google" 
          text="Login with Google" 
          variant="outline-secondary" 
          iconColor="text-danger" 
        />

        <Divider text="OR CONTINUE WITH EMAIL" />

        {/* Form Section */}
        <Form>
          {/* ใช้ IconInput ตัวเดิม แต่เปลี่ยน Placeholder เป็นของ Login */}
          <IconInput icon="bi-envelope-fill" placeholder="Username or Email" />
          <IconInput icon="bi-lock-fill" type="password" placeholder="Password" />

          {/* Submit Button */}
          <Button 
            className="w-100 py-3 rounded-pill fw-bold shadow-sm mt-2" 
            style={{ backgroundColor: '#a3d665', border: 'none', fontSize: '1.1rem', color: '#1c2434' }}
          >
            Login →
          </Button>
        </Form>

        {/* Footer */}
        <div className="text-center mt-4 text-muted" style={{ fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <span 
            className="fw-bold" 
            style={{ color: '#a3d665', cursor: 'pointer' }} 
            onClick={() => navigate('/register')}
          >
            Sign Up
          </span>
        </div>

      </div>
    </Container>
  );
}