// src/components/AddDevice/StepProgress.jsx
import React from 'react';

const StepProgress = ({ step, totalSteps, percentage }) => (
  <div className="px-4 mb-4 mt-3">
    <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.75rem', fontWeight: '700' }}>
      <span style={{ color: '#89C149' }}>STEP {step} OF {totalSteps}</span>
      <span className="text-muted">{percentage}%</span>
    </div>
    <div className="progress" style={{ height: '6px', backgroundColor: '#e9ecef', borderRadius: '10px' }}>
      <div 
        className="progress-bar" 
        role="progressbar" 
        style={{ width: `${percentage}%`, backgroundColor: '#89C149', borderRadius: '10px' }}
      ></div>
    </div>
  </div>
);

export default StepProgress;