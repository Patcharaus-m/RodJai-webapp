// src/components/AddDevice/DeviceConfigForm.jsx
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Router, Eye, EyeSlash } from 'react-bootstrap-icons'; // ใช้ Router เป็นไอคอนอุปกรณ์ (ถ้าอยากใช้ตัวอื่นเปลี่ยนได้ครับ)

const DeviceConfigForm = () => {
  // สร้าง State สำหรับเปิด/ปิดการมองเห็นรหัสผ่าน
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="px-4 text-center mt-4 animate__animated animate__fadeIn">
      {/* ไอคอนวงกลม */}
      <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
           style={{ width: '80px', height: '80px', backgroundColor: '#f0f7e9' }}>
        <Router size={35} style={{ color: '#89C149' }} />
      </div>

      <h4 className="fw-bold mb-3">Device Configuration</h4>
      <p className="text-muted small mb-4 px-3" style={{ lineHeight: '1.6' }}>
        Enter your home WiFi details to finalize the setup.
      </p>

      {/* ฟอร์มกรอกข้อมูล Step 2 */}
      <Form className="text-start mt-4">
        {/* Dropdown เลือก WiFi */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold small" style={{ color: '#4a5568' }}>WiFi Network Name (SSID)</Form.Label>
          <Form.Select 
            className="shadow-sm rounded-pill py-3 px-4 shadow-none text-muted"
            style={{ border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
            defaultValue=""
          >
            <option value="" disabled>Select WiFi Network</option>
            <option value="Home_5G">Home_5G</option>
            <option value="Home_2.4G">Home_2.4G</option>
            <option value="Guest">Guest Network</option>
          </Form.Select>
        </Form.Group>

        {/* Input กรอก Password */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold small" style={{ color: '#4a5568' }}>WiFi Password</Form.Label>
          <InputGroup className="shadow-sm rounded-pill bg-white" style={{ border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <Form.Control
              type={showPassword ? "text" : "password"} // เช็คเงื่อนไขว่าโชว์หรือซ่อน
              placeholder="Enter password"
              className="border-0 bg-transparent py-3 px-4 shadow-none"
              style={{ fontSize: '0.9rem' }}
            />
            <InputGroup.Text 
              className="bg-transparent border-0 pe-4" 
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)} // กดเพื่อสลับสถานะ
            >
              {showPassword ? <EyeSlash size={20} className="text-muted" /> : <Eye size={20} className="text-muted" />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default DeviceConfigForm;