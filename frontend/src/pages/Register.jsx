// src/pages/Register.jsx
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Import Components ที่เราเพิ่งสร้าง
import IconInput from '../components/Register/IconInput';
import SocialButton from '../components/Register/SocialButton';
import Divider from '../components/Register/Divider';

export default function Register() {
  const navigate = useNavigate();

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(to bottom, #f8faf4, #f4f7ef)' }}>
      
      <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm w-100" style={{ maxWidth: '420px' }}>
        
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
        />
        <SocialButton 
          icon="bi-google" 
          text="Sign up with Google" 
          variant="outline-secondary" 
          iconColor="text-danger" 
        />

        <Divider text="OR CONTINUE WITH EMAIL" />

        {/* Form Section */}
        <Form>
          {/* เรียกใช้ IconInput ทำให้โค้ดสั้นลงมาก */}
          <IconInput icon="bi-person-fill" placeholder="Username" />
          <IconInput icon="bi-envelope-fill" type="email" placeholder="name@example.com" />
          <IconInput icon="bi-lock-fill" type="password" placeholder="Create Password" />
          <IconInput icon="bi-lock-fill" type="password" placeholder="Confirm Password" />

          {/* Terms & Conditions */}
          <Form.Group className="mb-4 d-flex">
            <Form.Check type="checkbox" id="terms-check" className="me-2" />
            <Form.Label htmlFor="terms-check" className="text-muted" style={{ fontSize: '0.85rem' }}>
              I agree to the <span className="text-success text-decoration-underline" style={{ cursor: 'pointer' }}>Terms of Service</span> & <span className="text-success text-decoration-underline" style={{ cursor: 'pointer' }}>Privacy Policy</span>
            </Form.Label>
          </Form.Group>

          {/* Submit Button */}
          <Button 
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