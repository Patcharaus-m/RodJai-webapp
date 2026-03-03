// src/pages/Register.jsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Components ที่เราเพิ่งสร้าง
import IconInput from '../components/Register/IconInput';
import SocialButton from '../components/Register/SocialButton';
import Divider from '../components/Register/Divider';
import AlertBox from '../components/AlertBox';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    consent: false
  });

  const [alertData, setAlertData] = useState({ show: false, message: '', type: 'info' });
  const showAlert = (message, type = 'info') => setAlertData({ show: true, message, type });
  const closeAlert = () => setAlertData(prev => ({ ...prev, show: false }));

  // 2. ฟังก์ชันจัดการการเปลี่ยนแปลงค่าใน Input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLineLogin = () => {
  const client_id = '2009308819'; // จากรูป image_538d9d.png [cite: 2026-03-04]
  const redirect_uri = encodeURIComponent('http://localhost:3000/api/auth/line/callback');
  const state = 'random_string_123'; // กันการโจมตีแบบ CSRF
  
  const lineUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=profile%20openid%20email`;
  
  window.location.href = lineUrl; // พายูสเซอร์ไปหน้า Login ของ LINE
};

  // 3. ฟังก์ชันส่งข้อมูลไปยัง Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      return showAlert("Please enter your username", "error");
    }

    if (formData.username.trim().length < 3){
      return showAlert("Username must be at least 3 characters long.", "error");
    }

    if (formData.username.trim().length > 30){
      return showAlert("Username must be at most 30 characters long.", "error");
    }

    if (!formData.email.trim()) {
      return showAlert("Please enter your email.", "error");
    }

    if (!formData.password.trim()) {
      return showAlert("Please enter your password.", "error");
    }

    if (formData.password.trim().length < 6){
      return showAlert("Password must be at least 6 characters long.", "error");
    }

    if (formData.password.trim().length > 30){
      return showAlert("Password must be at most 30 characters long.", "error");
    }

    if (!formData.confirmPassword.trim()) {
      return showAlert("Please enter your confirm password.",  "error");
    }

    // ตรวจสอบความถูกต้องเบื้องต้น
    if (formData.password !== formData.confirmPassword) {
      return showAlert("Passwords do not match!", "error");
    }

    if (!formData.consent) {
        return showAlert("Please agree to the Terms of Service.", "warning");
    }

    

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        consent: formData.consent // ส่งค่าการยินยอมตาม Schema
      });

      showAlert("Registration Successful!", "success");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      
      const serverError = err.response?.data?.error;

      if (serverError === "Username or Email already exists") {
      showAlert("Username or Email already exists", "error");
    } else {
      showAlert(serverError || "Registration failed", "error");
    }

      if (err.response && err.response.data){
        const errorMassage = err.response.data.error;

        showAlert(errorMassage, "error");
      } else {
        showAlert("Something went wrong. Please try again.", "error")
      }
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ background: 'linear-gradient(to bottom, #f8faf4, #f4f7ef)' }}>
      <AlertBox message={alertData.message} type={alertData.type} show={alertData.show} onClose={closeAlert} />
      
      <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm w-100 border-0 my-auto" style={{ maxWidth: '420px' }}>
        
        {/* Header Section */}
        <div className="text-center mb-4">
          <div className="d-inline-flex justify-content-center align-items-center rounded-circle bg-light p-3 mb-3" style={{ color: '#a3d665' }}>
            <i className="bi bi-tractor" style={{ fontSize: '1.5rem' }}></i>
          </div>
          <h2 className="fw-bold text-dark">Create your account</h2>
          <p className="text-muted">Join the smart farming revolution.</p>
        </div>

        {/* Social Buttons */}
        <SocialButton 
          icon="bi-line" 
          text="Sign up with LINE" 
          bgColor="#00C300" 
          textColor="white"
          onClick={handleLineLogin}
        />
        <SocialButton 
          icon="bi-google" 
          text="Sign up with Google" 
          variant="outline-secondary" 
          iconColor="text-danger" 
        />

        <Divider text="OR CONTINUE WITH EMAIL" />

        {/* Form Section */}
        <Form onSubmit={handleSubmit}> 
            <IconInput 
                icon="bi-person-fill" 
                placeholder="Username" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
            />
            <IconInput 
                icon="bi-envelope-fill" 
                type="email" 
                placeholder="name@example.com" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
            />
            <IconInput 
                icon="bi-lock-fill" 
                type="password" 
                placeholder="Create Password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
            />
            <IconInput 
                icon="bi-lock-fill" 
                type="password" 
                placeholder="Confirm Password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
            />

            {/* Terms & Conditions */}
            <Form.Group className="mb-4 d-flex">
                <Form.Check 
                    type="checkbox" 
                    id="terms-check" 
                    className="me-2" 
                    name="consent" 
                    checked={formData.consent} 
                    onChange={handleChange} 
                />
                <Form.Label htmlFor="terms-check" className="text-muted" style={{ fontSize: '0.85rem' }}>
                    I agree to the <span className="text-success text-decoration-underline" style={{ cursor: 'pointer' }}>Terms of Service</span> & <span className="text-success text-decoration-underline" style={{ cursor: 'pointer' }}>Privacy Policy</span>
                </Form.Label>
            </Form.Group>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-100 py-3 rounded-pill fw-bold shadow-sm" 
            style={{ backgroundColor: '#a3d665', border: 'none', fontSize: '1.1rem', color: '#1c2434' }}
          >
            Sign Up →
          </Button>
        </Form>

        {/* Footer */}
        <div className="text-center mt-4 text-muted" style={{ fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <span className="fw-bold" style={{ color: '#a3d665', cursor: 'pointer' }} onClick={() => navigate('/login')}>
            Log In
          </span>
        </div>

      </div>
    </Container>
  );
}