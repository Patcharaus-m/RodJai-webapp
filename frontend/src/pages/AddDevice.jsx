// src/pages/AddDevice.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Check2 } from 'react-bootstrap-icons';
import StepProgress from '../components/AddDevice/StepProgress';
import DeviceForm from '../components/AddDevice/DeviceForm';
import DeviceConfigForm from '../components/AddDevice/DeviceConfigForm'; // Import ฟอร์มใหม่เข้ามา

const AddDevicePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // เริ่มต้นที่ Step 1

  // ฟังก์ชันกดปุ่มถัดไป
  const handleNext = () => {
    if (step === 1) {
      setStep(2); // ถ้าอยู่ Step 1 ให้ไป 2
    } else {
      // ถ้าอยู่ Step 2 (เสร็จแล้ว) ให้เด้งกลับหน้า Home และอาจจะส่งข้อมูลไปหา Backend ตรงนี้
      navigate('/home'); 
    }
  };

  // ฟังก์ชันกดย้อนกลับ/ยกเลิก
  const handleBack = () => {
    if (step === 2) {
      setStep(1); // ถ้าอยู่ Step 2 ให้ย้อนกลับมา 1
    } else {
      navigate(-1); // ถ้าอยู่ Step 1 ให้ย้อนกลับไปหน้าก่อนหน้า (Home)
    }
  };

  return (
    <div className="bg-white min-vh-100 pb-5" style={{ maxWidth: '450px', margin: '0 auto', position: 'relative' }}>
      
      {/* Header */}
      <div className="d-flex align-items-center p-4">
        <ArrowLeft size={24} style={{ cursor: 'pointer', color: '#4a5568' }} onClick={handleBack} />
        <h6 className="mx-auto mb-0 fw-bold text-secondary">Add Device</h6>
        <div style={{ width: 24 }}></div> 
      </div>

      {/* แถบ Progress */}
      <StepProgress 
        step={step} 
        totalSteps={2} 
        percentage={step === 1 ? 50 : 100} // ถ้าอยู่ Step 1 โชว์ 50% ถ้า Step 2 โชว์ 100%
      />
      
      {/* เงื่อนไขแสดงฟอร์ม */}
      {step === 1 ? <DeviceForm /> : <DeviceConfigForm />}

      {/* ส่วนปุ่มด้านล่าง (เปลี่ยนไปตาม Step) */}
      <div className="px-4 mt-5 d-flex flex-column gap-3">
        <Button
          onClick={handleNext}
          className="rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center w-100 shadow-sm"
          style={{ backgroundColor: '#89C149', border: 'none', fontSize: '1rem' }}
        >
          {step === 1 ? (
            <>Connect & Pair <ArrowRight className="ms-2" size={18} /></>
          ) : (
            <>Finish Setup <Check2 className="ms-2" size={20} /></>
          )}
        </Button>
        <Button
          variant="link"
          className="text-muted text-decoration-none fw-bold w-100 mt-2"
          onClick={handleBack}
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </Button>
      </div>

    </div>
  );
};

export default AddDevicePage;