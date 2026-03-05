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
    <div className="bg-white pt-4 px-3 pb-2">
      <div className="d-flex align-items-center justify-content-between">
        {/* กลุ่มซ้าย: รูป + ข้อความ */}
        <div className="d-flex align-items-center overflow-hidden">
          <div className="flex-shrink-0 me-3">
            {user?.profile_image ? (
              <img
                src={user.profile_image}
                alt="Profile"
                className="rounded-circle border"
                style={{ width: '45px', height: '45px', objectFit: 'cover' }}
              />
            ) : (
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                <PersonCircle size={30} className="text-secondary" />
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <div className="text-muted small mb-0" style={{ fontSize: '0.75rem' }}>Welcome back,</div>
            <h6 className="fw-bold mb-0 text-truncate" style={{ fontSize: '1.1rem' }}>
              Hello, {user?.username || 'must have brain!'}!
            </h6>
          </div>
        </div>

        {/* ปุ่มแจ้งเตือนด้านขวา */}
        <div className="flex-shrink-0 ms-2">
          <div className="position-relative p-2 bg-light rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BellFill size={20} className="text-dark" />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-white rounded-circle" style={{ marginTop: '8px', marginLeft: '-8px' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;