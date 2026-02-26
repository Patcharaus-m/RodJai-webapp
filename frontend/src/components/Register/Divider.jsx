// src/components/Divider.jsx
import React from 'react';

export default function Divider({ text }) {
  return (
    <div className="d-flex align-items-center mb-4 text-muted">
      <hr className="flex-grow-1" />
      <span className="mx-3 fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
        {text}
      </span>
      <hr className="flex-grow-1" />
    </div>
  );
}