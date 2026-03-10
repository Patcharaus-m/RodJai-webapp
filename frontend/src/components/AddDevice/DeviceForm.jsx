// src/components/AddDevice/DeviceForm.jsx
// Step 1: คำแนะนำเปิด Hotspot มือถือ
import React from 'react';
import { Wifi, Phone, PlugFill, CheckCircleFill } from 'react-bootstrap-icons';

const DeviceForm = () => (
  <div className="px-4 text-center mt-4">
    {/* ไอคอนวงกลม */}
    <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
         style={{ width: '80px', height: '80px', backgroundColor: '#f0f7e9' }}>
      <Phone size={40} style={{ color: '#89C149' }} />
    </div>

    <h4 className="fw-bold mb-2">เปิด Hotspot มือถือ</h4>
    <p className="text-muted small mb-4 px-2" style={{ lineHeight: '1.6' }}>
      เปิด Hotspot บนมือถือของคุณตามการตั้งค่าด้านล่าง แล้วเสียบปลั๊กอุปกรณ์ RodJai
    </p>

    {/* Hotspot Config Card */}
    <div className="rounded-4 p-4 mx-2 text-start"
         style={{ 
           background: 'linear-gradient(135deg, #f0f7e9 0%, #e8f5d8 100%)', 
           border: '1px solid #d4e8c0' 
         }}>
      <div className="d-flex align-items-center mb-3">
        <Wifi size={20} style={{ color: '#89C149' }} className="me-2" />
        <span className="fw-bold small" style={{ color: '#4a5568' }}>การตั้งค่า Hotspot</span>
      </div>

      <div className="mb-3">
        <div className="text-muted" style={{ fontSize: '0.75rem' }}>ชื่อ Hotspot (SSID)</div>
        <div className="fw-bold" style={{ fontSize: '1.1rem', color: '#2d3748', fontFamily: 'monospace' }}>
          RodjaiBackup
        </div>
      </div>

      <div>
        <div className="text-muted" style={{ fontSize: '0.75rem' }}>รหัสผ่าน</div>
        <div className="fw-bold" style={{ fontSize: '1.1rem', color: '#2d3748', fontFamily: 'monospace' }}>
          rodjai12345678
        </div>
      </div>
    </div>

    {/* Checklist */}
    <div className="text-start mx-2 mt-4">
      <div className="d-flex align-items-center mb-3">
        <CheckCircleFill size={18} style={{ color: '#89C149' }} className="me-3 flex-shrink-0" />
        <span className="small" style={{ color: '#4a5568' }}>เปิด Hotspot มือถือด้วยชื่อ <strong>RodjaiBackup</strong></span>
      </div>
      <div className="d-flex align-items-center mb-3">
        <PlugFill size={18} style={{ color: '#89C149' }} className="me-3 flex-shrink-0" />
        <span className="small" style={{ color: '#4a5568' }}>เสียบปลั๊กอุปกรณ์ RodJai แล้วรอ 10 วินาที</span>
      </div>
      <div className="d-flex align-items-center">
        <Wifi size={18} style={{ color: '#89C149' }} className="me-3 flex-shrink-0" />
        <span className="small" style={{ color: '#4a5568' }}>อุปกรณ์จะเชื่อมต่อ Hotspot อัตโนมัติ</span>
      </div>
    </div>
  </div>
);

export default DeviceForm;