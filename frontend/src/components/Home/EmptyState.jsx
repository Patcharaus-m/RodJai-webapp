import { Button } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const EmptyState = () => {
  const navigate = useNavigate();

  const handleAddDevice = () => {
    navigate('/add-device');
  };

  return (
    <div className="text-center mt-5 px-4">
      {/* ส่วนรูปภาพประกอบ */}
      <div className="mx-auto mb-4 d-flex align-items-center justify-content-center" 
           style={{ 
             width: '200px', 
             height: '200px', 
             backgroundColor: '#f9fff6', 
             borderRadius: '50%',
             position: 'relative',
             border: '1px solid #f0f7e9'
           }}>
        {/* ไอคอนกระถางต้นไม้ (แนะนำให้ใช้ไฟล์ SVG หรือ Image ตามรูปต้นฉบับ) */}
        <img src="/pot-icon.png" alt="No Device" style={{ width: '100px' }} />
        
        {/* ไอคอนสัญญาณเล็กๆ ด้านล่างขวา */}
        <div className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center"
             style={{ position: 'absolute', bottom: '30px', right: '15px', width: '35px', height: '35px' }}>
          <span style={{ fontSize: '14px' }}>📡</span>
        </div>
      </div>
      
      {/* ข้อความอธิบาย */}
      <h4 className="fw-bold mb-2" style={{ color: '#1a1a1a' }}>No devices connected yet</h4>
      <p className="text-muted small px-4 mb-4">
        Add your RodJai smart controller to start managing your farm efficiently.
      </p>
      
      {/* ปุ่มเพิ่มอุปกรณ์ */}
      <Button 
        onClick={handleAddDevice} 
        className="rounded-pill px-4 py-2 w-100 d-flex align-items-center justify-content-center mx-auto shadow-sm"
        style={{ 
          backgroundColor: '#89C149', 
          border: 'none', 
          maxWidth: '280px', 
          height: '50px',
          fontWeight: '600'
        }}
      >
        <PlusCircleFill className="me-2" size={20} /> Add New Device
      </Button>
    </div>
  );
};

export default EmptyState;