// src/components/IconInput.jsx
import React, { useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';

// 1. รับ props name, value, และ onChange เพิ่มเข้ามาตรงนี้ครับ
export default function IconInput({ icon, type = 'text', placeholder, name, value, onChange }) {
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
        name={name}           // 2. เอาสายไฟ name มาเสียบ
        value={value}         // 3. เอาสายไฟ value มาเสียบ
        onChange={onChange}   // 4. เอาสายไฟ onChange มาเสียบ
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