import React from 'react';
import Header from '../components/Home/Header';
import EmptyState from '../components/Home/EmptyState';
import SummaryCard from '../components/Home/SummaryCard';
import BottomNav from '../components/Home/BottomNav';

const HomePage = () => {
  return (
    <div className="bg-light min-vh-100 pb-5" style={{ maxWidth: '450px', margin: '0 auto', position: 'relative' }}>
      {/* Background ส่วนบนที่เป็นสีขาวไล่ระดับ (ถ้าต้องการ) */}
      <div className="bg-white pb-4">
        <Header />
        <EmptyState />
      </div>

      <SummaryCard />

      {/* เผื่อ Space ด้านล่างไม่ให้โดน Nav ทับ */}
      <div style={{ height: '80px' }}></div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;