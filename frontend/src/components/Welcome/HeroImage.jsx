// src/components/HeroImage.jsx
// นำเข้ารูปภาพจากโฟลเดอร์ assets
import rodjaiLogo from '../../assets/RodJaiLogo.webp';

export default function HeroImage() {
  return (
    <div className="hero-image-wrapper">
      {/* วงกลมหลัก */}
      <div className="hero-main-circle">
        <img 
          src={rodjaiLogo} 
          alt="RodJai Smart Farming" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* ไอคอนใบไม้ */}
      <div className="icon-badge leaf-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M17.5 3C13.5 3 9.5 5 7 8C4.5 11 3 15 3 19C3 19.5 3.5 20 4 20C4.5 20 5 19.5 5 19C5 16 6.5 13 8.5 11C10.5 9 13.5 7.5 17.5 7.5C18 7.5 18.5 7 18.5 6.5C18.5 6 18 5.5 17.5 5.5C14.5 5.5 12 6.5 10 8C11.5 6 14 4.5 17.5 4.5C18 4.5 18.5 4 18.5 3.5C18.5 3 18 3 17.5 3Z"/>
        </svg>
      </div>

      {/* ไอคอนสัญญาณ */}
      <div className="icon-badge signal-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/>
        </svg>
      </div>
    </div>
  );
}