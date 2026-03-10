// src/components/AddDevice/DeviceConfigForm.jsx
// Step 3: กรอก Home WiFi SSID + Password
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Wifi, Eye, EyeSlash } from 'react-bootstrap-icons';

const DeviceConfigForm = ({ wifiSSID, setWifiSSID, wifiPassword, setWifiPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="px-4 text-center mt-4 animate__animated animate__fadeIn">
      {/* ไอคอนวงกลม */}
      <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
           style={{ width: '80px', height: '80px', backgroundColor: '#f0f7e9' }}>
        <Wifi size={35} style={{ color: '#89C149' }} />
      </div>

      <h4 className="fw-bold mb-2">ตั้งค่า WiFi บ้าน</h4>
      <p className="text-muted small mb-4 px-3" style={{ lineHeight: '1.6' }}>
        กรอก WiFi บ้านเพื่อให้อุปกรณ์เปลี่ยนจาก Hotspot ไปเชื่อมต่อ WiFi บ้านของคุณ
      </p>

      {/* ฟอร์ม */}
      <Form className="text-start mt-4">
        {/* WiFi SSID — input แทน dropdown */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold small" style={{ color: '#4a5568' }}>ชื่อ WiFi (SSID)</Form.Label>
          <Form.Control
            type="text"
            placeholder="เช่น Home_5G"
            className="shadow-sm rounded-pill py-3 px-4 shadow-none"
            style={{ border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
            value={wifiSSID}
            onChange={(e) => setWifiSSID(e.target.value)}
          />
        </Form.Group>

        {/* WiFi Password */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold small" style={{ color: '#4a5568' }}>รหัสผ่าน WiFi</Form.Label>
          <InputGroup className="shadow-sm rounded-pill bg-white" style={{ border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="กรอกรหัสผ่าน WiFi"
              className="border-0 bg-transparent py-3 px-4 shadow-none"
              style={{ fontSize: '0.9rem' }}
              value={wifiPassword}
              onChange={(e) => setWifiPassword(e.target.value)}
            />
            <InputGroup.Text 
              className="bg-transparent border-0 pe-4" 
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash size={20} className="text-muted" /> : <Eye size={20} className="text-muted" />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Form>

      {/* Note */}
      <div className="rounded-3 p-3 mx-1 text-start" 
           style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082' }}>
        <p className="mb-0 small" style={{ color: '#795548' }}>
          ⚠️ หลังกด <strong>Finish Setup</strong> อุปกรณ์จะ restart เพื่อเชื่อมต่อ WiFi บ้านของคุณ — อาจใช้เวลาประมาณ 10 วินาที
        </p>
      </div>
    </div>
  );
};

export default DeviceConfigForm;