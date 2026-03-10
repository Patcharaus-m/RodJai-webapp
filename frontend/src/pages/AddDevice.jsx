// src/pages/AddDevice.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Check2 } from 'react-bootstrap-icons';
import axios from 'axios';
import StepProgress from '../components/AddDevice/StepProgress';
import DeviceForm from '../components/AddDevice/DeviceForm';
import DeviceRegisterForm from '../components/AddDevice/DeviceRegisterForm';
import DeviceConfigForm from '../components/AddDevice/DeviceConfigForm';

const API_BASE = 'http://localhost:3000/api';

const AddDevicePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 2 state
  const [serialNumber, setSerialNumber] = useState('');
  const [deviceName, setDeviceName] = useState('');

  // Step 3 state
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');

  const getStepPercentage = () => {
    if (step === 1) return 33;
    if (step === 2) return 66;
    return 100;
  };

  // ฟังก์ชันกดปุ่มถัดไป
  const handleNext = async () => {
    setError('');

    if (step === 1) {
      // Step 1 → Step 2 (ไม่ต้องส่งข้อมูลใดๆ)
      setStep(2);
    } else if (step === 2) {
      // Step 2 → Step 3: ลงทะเบียนอุปกรณ์
      if (!serialNumber.trim() || !deviceName.trim()) {
        setError('กรุณากรอก Serial Number และชื่ออุปกรณ์');
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        await axios.post(`${API_BASE}/device/register`, {
          serial_number: serialNumber.trim(),
          name: deviceName.trim(),
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStep(3);
      } catch (err) {
        const msg = err.response?.data?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน';
        setError(msg);
      } finally {
        setLoading(false);
      }
    } else {
      // Step 3: ส่ง WiFi config → MQTT → Finish
      if (!wifiSSID.trim() || !wifiPassword.trim()) {
        setError('กรุณากรอก WiFi SSID และรหัสผ่าน');
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        await axios.post(`${API_BASE}/device/wifi`, {
          serial_number: serialNumber.trim(),
          ssid: wifiSSID.trim(),
          password: wifiPassword.trim(),
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/home');
      } catch (err) {
        const msg = err.response?.data?.message || 'เกิดข้อผิดพลาดในการส่งคำสั่ง WiFi';
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
  };

  // ฟังก์ชันกดย้อนกลับ
  const handleBack = () => {
    setError('');
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  // ข้อความปุ่ม
  const getButtonLabel = () => {
    if (step === 1) return <>ถัดไป <ArrowRight className="ms-2" size={18} /></>;
    if (step === 2) return <>ลงทะเบียน <ArrowRight className="ms-2" size={18} /></>;
    return <>Finish Setup <Check2 className="ms-2" size={20} /></>;
  };

  return (
    <div className="bg-white min-vh-100 pb-5" style={{ maxWidth: '450px', margin: '0 auto', position: 'relative' }}>
      
      {/* Header */}
      <div className="d-flex align-items-center p-4">
        <ArrowLeft size={24} style={{ cursor: 'pointer', color: '#4a5568' }} onClick={handleBack} />
        <h6 className="mx-auto mb-0 fw-bold text-secondary">เพิ่มอุปกรณ์</h6>
        <div style={{ width: 24 }}></div> 
      </div>

      {/* แถบ Progress */}
      <StepProgress 
        step={step} 
        totalSteps={3} 
        percentage={getStepPercentage()}
      />
      
      {/* เงื่อนไขแสดงฟอร์ม */}
      {step === 1 && <DeviceForm />}
      {step === 2 && (
        <DeviceRegisterForm 
          serialNumber={serialNumber}
          setSerialNumber={setSerialNumber}
          deviceName={deviceName}
          setDeviceName={setDeviceName}
        />
      )}
      {step === 3 && (
        <DeviceConfigForm
          wifiSSID={wifiSSID}
          setWifiSSID={setWifiSSID}
          wifiPassword={wifiPassword}
          setWifiPassword={setWifiPassword}
        />
      )}

      {/* Error message */}
      {error && (
        <div className="px-4 mt-3">
          <div className="alert alert-danger py-2 rounded-3 small mb-0" role="alert">
            {error}
          </div>
        </div>
      )}

      {/* ส่วนปุ่มด้านล่าง */}
      <div className="px-4 mt-5 d-flex flex-column gap-3">
        <Button
          onClick={handleNext}
          disabled={loading}
          className="rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center w-100 shadow-sm"
          style={{ backgroundColor: '#89C149', border: 'none', fontSize: '1rem' }}
        >
          {loading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            getButtonLabel()
          )}
        </Button>
        <Button
          variant="link"
          className="text-muted text-decoration-none fw-bold w-100 mt-2"
          onClick={handleBack}
          disabled={loading}
        >
          {step === 1 ? 'ยกเลิก' : 'ย้อนกลับ'}
        </Button>
      </div>

    </div>
  );
};

export default AddDevicePage;