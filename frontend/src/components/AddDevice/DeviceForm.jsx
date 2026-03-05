// src/components/AddDevice/DeviceForm.jsx
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Wifi, QrCodeScan } from 'react-bootstrap-icons';

const DeviceForm = () => (
  <div className="px-4 text-center mt-4">
    {/* ไอคอนวงกลม */}
    <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
         style={{ width: '80px', height: '80px', backgroundColor: '#f0f7e9' }}>
      <Wifi size={40} style={{ color: '#89C149' }} />
    </div>

    <h4 className="fw-bold mb-3">Connect to WiFi</h4>
    <p className="text-muted small mb-4 px-3" style={{ lineHeight: '1.6' }}>
      Please select "<strong>RodJai_Config</strong>" from your WiFi settings to initialize the device.
    </p>

    {/* ฟอร์มกรอกข้อมูล */}
    <Form className="text-start mt-4">
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small" style={{ color: '#4a5568' }}>Serial Number</Form.Label>
        <InputGroup className="shadow-sm rounded-pill bg-white" style={{ border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <Form.Control
            type="text"
            placeholder="Enter S/N on back of device"
            className="border-0 bg-transparent py-3 px-4 shadow-none"
            style={{ fontSize: '0.9rem' }}
          />
          <InputGroup.Text className="bg-transparent border-0 pe-4" style={{ cursor: 'pointer' }}>
            <QrCodeScan size={20} style={{ color: '#89C149' }} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small" style={{ color: '#4a5568' }}>Device Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., My Garden"
          className="shadow-sm rounded-pill py-3 px-4 shadow-none"
          style={{ border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
        />
      </Form.Group>
    </Form>
  </div>
);

export default DeviceForm;