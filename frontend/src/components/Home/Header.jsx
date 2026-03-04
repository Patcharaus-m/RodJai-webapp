import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BellFill, PersonCircle } from 'react-bootstrap-icons';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:3000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data?.payload?.user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, []);

  return (
    <Container fluid className="pt-4 px-4">
      <Row className="align-items-center">
        <Col xs={2}>
          {user?.profile_image ? (
            <img
              src={user.profile_image}
              alt="Profile"
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <PersonCircle size={40} className="text-secondary" />
          )}
        </Col>
        <Col xs={8}>
          <div className="text-muted small">Welcome back,</div>
          <h5 className="fw-bold mb-0">Hello, {user?.username || 'Farmer'}!</h5>
        </Col>
        <Col xs={2} className="text-end">
          <div className="position-relative d-inline-block">
            <BellFill size={24} className="text-dark" />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;