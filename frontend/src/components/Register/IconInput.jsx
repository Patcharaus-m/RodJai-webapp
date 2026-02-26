// src/components/IconInput.jsx
import React, { useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';

export default function IconInput({ icon, type = 'text', placeholder }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  return (
    <InputGroup className="mb-3 shadow-sm">
      {/* ไอคอนด้านซ้าย */}
      <InputGroup.Text className="bg-light border-end-0 rounded-start-pill ps-4 text-muted">
        <i className={`bi ${icon}`}></i>
      </InputGroup.Text>
      
      {/* ช่องกรอกข้อมูล */}
      <Form.Control 
        type={currentType} 
        placeholder={placeholder} 
        className={`bg-light py-2 ${isPassword ? 'border-x-0' : 'border-start-0 rounded-end-pill'}`} 
      />
      
      {/* ไอคอนเปิด-ปิดรหัสผ่าน (ด้านขวา) จะโชว์ก็ต่อเมื่อ type เป็น password */}
      {isPassword && (
        <InputGroup.Text 
          className="bg-light border-start-0 rounded-end-pill pe-4 text-muted" 
          style={{ cursor: 'pointer' }}
          onClick={() => setShowPassword(!showPassword)}
        >
          <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
        </InputGroup.Text>
      )}
    </InputGroup>
  );
}