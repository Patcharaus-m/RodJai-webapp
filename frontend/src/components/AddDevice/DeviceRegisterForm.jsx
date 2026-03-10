// src/components/AddDevice/DeviceRegisterForm.jsx
// Step 2: กรอก Serial Number + ชื่ออุปกรณ์
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Router, QrCodeScan } from 'react-bootstrap-icons';

const DeviceRegisterForm = ({ serialNumber, setSerialNumber, deviceName, setDeviceName }) => (
  <div className="px-4 text-center mt-4">
    {/* ไอคอนวงกลม */}
    <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
         style={{ width: '80px', height: '80px', backgroundColor: '#f0f7e9' }}>
      <Router size={35} style={{ color: '#89C149' }} />
    </div>

    <h4 className="fw-bold mb-2">ลงทะเบียนอุปกรณ์</h4>
    <p className="text-muted small mb-4 px-3" style={{ lineHeight: '1.6' }}>
      กรอก Serial Number ที่อยู่ด้านหลังอุปกรณ์ และตั้งชื่อให้อุปกรณ์ของคุณ
    </p>

    {/* ฟอร์มกรอกข้อมูล */}
    <Form className="text-start mt-4">
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small" style={{ color: '#4a5568' }}>Serial Number</Form.Label>
        <InputGroup className="shadow-sm rounded-pill bg-white" style={{ border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <Form.Control
            type="text"
            placeholder="กรอก S/N ด้านหลังอุปกรณ์"
            className="border-0 bg-transparent py-3 px-4 shadow-none"
            style={{ fontSize: '0.9rem' }}
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
          <InputGroup.Text className="bg-transparent border-0 pe-4" style={{ cursor: 'pointer' }}>
            <QrCodeScan size={20} style={{ color: '#89C149' }} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small" style={{ color: '#4a5568' }}>ชื่ออุปกรณ์</Form.Label>
        <Form.Control
          type="text"
          placeholder="เช่น สวนหน้าบ้าน"
          className="shadow-sm rounded-pill py-3 px-4 shadow-none"
          style={{ border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
        />
      </Form.Group>
    </Form>
  </div>
);

export default DeviceRegisterForm;
