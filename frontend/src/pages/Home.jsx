import React, { useState } from 'react';
import Header from '../components/Home/Header';
import WeatherCard from '../components/Home/WeatherCard';
import DeviceCard from '../components/Home/DeviceCard';
import SummaryCard from '../components/Home/SummaryCard';
import EmptyState from '../components/Home/EmptyState'; // import กลับมา
import BottomNav from '../components/Home/BottomNav';
import { Plus } from 'react-bootstrap-icons';

const HomePage = () => {
  // สมมติว่าดึงข้อมูลมาจาก API ถ้า [] คือไม่มีอุปกรณ์
  const [devices, setDevices] = useState([]); 

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