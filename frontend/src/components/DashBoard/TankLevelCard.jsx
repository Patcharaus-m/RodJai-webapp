import React from 'react';
import { Card } from 'react-bootstrap';

const TankLevelCard = () => (
  <Card className="border-0 shadow-sm rounded-4 mb-3">
    <Card.Body className="d-flex justify-content-between align-items-center p-4">
      {/* ข้อมูลด้านซ้าย */}
      <div>
        <div className="text-uppercase text-muted mb-1" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
          TANK LEVEL
        </div>
        <div className="fw-bold text-success" style={{ fontSize: '2.2rem', lineHeight: '1' }}>
          --%
        </div>
        <div className="text-muted mt-1" style={{ fontSize: '0.85rem' }}>
          Waiting
        </div>
      </div>

      {/* กราฟิกถังน้ำด้านขวา (วาดด้วย CSS) */}
      <div 
        className="d-flex align-items-end"
        style={{
          width: '50px',
          height: '65px',
          border: '2px solid #85c8ff', /* สีฟ้าขอบถัง */
          borderRadius: '10px',
          padding: '2px',
          backgroundColor: '#ffffff'
        }}
      >
        {/* ระดับน้ำในถัง (ถ้ามีเปอร์เซ็นต์ก็ปรับ height ตรงนี้ได้เลย เช่น height: '50%') */}
        <div 
          style={{
            width: '100%',
            height: '15%', /* ระดับน้ำจำลองตอน waiting */
            backgroundColor: '#e0f0ff',
            borderRadius: '0 0 6px 6px'
          }}
        ></div>
      </div>
    </Card.Body>
  </Card>
);

export default TankLevelCard;