import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Home/Header';
import WeatherCard from '../components/Home/WeatherCard';
import DeviceCard from '../components/Home/DeviceCard';
import SummaryCard from '../components/Home/SummaryCard';
import EmptyState from '../components/Home/EmptyState'; // import กลับมา
import BottomNav from '../components/Home/BottomNav';
import { Plus } from 'react-bootstrap-icons';

const API_BASE = 'http://localhost:3000/api';

const HomePage = () => {
  const [devices, setDevices] = useState([]); 

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`${API_BASE}/device/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.status) {
          setDevices(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <div className="bg-light min-vh-100 shadow-sm" 
           style={{ maxWidth: '450px', margin: '0 auto', position: 'relative', paddingBottom: '100px' }}>
        
        <Header />
        <WeatherCard />

        {/* ส่วนที่เพิ่มเงื่อนไขเช็คอุปกรณ์ */}
        {devices.length > 0 ? (
          <>
            <DeviceCard devices={devices} />
            <SummaryCard />
          </>
        ) : (
          <EmptyState />
        )}

        {/* ปุ่มบวกให้แสดงเฉพาะตอนที่มีอุปกรณ์แล้ว หรือจะให้แสดงตลอดก็ได้ */}
        {devices.length > 0 && (
          <div style={{ position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(140px)', zIndex: 1050 }}>
            <button className="btn btn-success rounded-circle shadow-lg d-flex align-items-center justify-content-center" 
              style={{ width: '55px', height: '55px', backgroundColor: '#89C149', border: 'none' }}>
              <Plus size={35} color="white" />
            </button>
          </div>
        )}

        <BottomNav />
      </div>
    </div>
  );
};

export default HomePage;