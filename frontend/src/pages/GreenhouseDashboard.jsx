import React from 'react';
import { Container } from 'react-bootstrap';
import { ChevronLeft } from 'react-bootstrap-icons';
import PowerSourceCard from '../components/DashBoard/PowerSourceCard';
import WaterUsageCard from '../components/DashBoard/WaterUsageCard';
import TankLevelCard from '../components/DashBoard/TankLevelCard';
import ZoneAnalyticsCard from '../components/DashBoard/ZoneAnalyticsCard';
import BottomNav from '../components/Home/BottomNav'; 

const GreenhouseDashboard = () => {
  return (
    <div className="bg-light min-vh-100" style={{ maxWidth: '450px', margin: '0 auto', position: 'relative' }}>
      
      {/* ----------------- ส่วน Header & Tabs (เขียนใหม่ให้เป๊ะขึ้น) ----------------- */}
      <div className="bg-white">
        {/* Header */}
        <div className="d-flex align-items-center px-3 py-3">
          <div style={{ width: '30px' }}>
            <ChevronLeft size={20} style={{ cursor: 'pointer' }} />
          </div>
          <div className="flex-grow-1 text-center">
            <div className="fw-bold" style={{ fontSize: '1.1rem' }}>Greenhouse A</div>
            <div className="text-muted d-flex align-items-center justify-content-center mt-1" style={{ fontSize: '0.8rem' }}>
              <span className="bg-secondary rounded-circle me-1" style={{ width: '6px', height: '6px' }}></span>
              Offline
            </div>
          </div>
          <div style={{ width: '30px' }}></div> {/* Spacer ดันให้ชื่ออยู่ตรงกลาง */}
        </div>

        {/* Tabs */}
        <div className="d-flex justify-content-between px-4 pt-2 border-bottom">
          <div className="pb-2 text-success fw-bold text-center" style={{ borderBottom: '3px solid #198754', width: '30%', cursor: 'pointer' }}>
            Overview
          </div>
          <div className="pb-2 text-muted fw-medium text-center" style={{ width: '30%', cursor: 'pointer' }}>
            Zones
          </div>
          <div className="pb-2 text-muted fw-medium text-center" style={{ width: '30%', cursor: 'pointer' }}>
            Settings
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------------------------- */}

      {/* Main Content */}
      <Container className="pt-4 pb-5">
        <PowerSourceCard />
        <WaterUsageCard />
        <TankLevelCard />
        
        <h5 className="fw-bold mt-4 mb-3">Zone Analytics</h5>
        <ZoneAnalyticsCard />
      </Container>
      
      <div style={{ height: '80px' }}></div>
      <BottomNav activeKey="Home" />
    </div>
  );
};

export default GreenhouseDashboard;