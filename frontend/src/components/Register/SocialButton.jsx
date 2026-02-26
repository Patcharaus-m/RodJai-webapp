// src/components/SocialButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

export default function SocialButton({ icon, text, variant = 'primary', bgColor, textColor, iconColor }) {
  const customStyle = bgColor ? { backgroundColor: bgColor, border: 'none', color: textColor } : {};

  return (
    <Button 
      variant={variant}
      className={`w-100 mb-3 d-flex align-items-center justify-content-center gap-2 py-2 rounded-pill fw-bold ${!bgColor ? 'border-2 text-dark' : ''}`} 
      style={customStyle}
    >
      <i className={`bi ${icon} ${iconColor}`}></i> {text}
    </Button>
  );
}