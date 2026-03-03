import { Button } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

const EmptyState = () => (
  <div className="text-center my-5 px-4">
    <div className="mx-auto mb-4" style={{ 
      width: '180px', height: '180px', 
      backgroundColor: '#f8fff8', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* ใส่ไฟล์ SVG ของคุณตรงนี้ */}
      <img src="/plant-icon.svg" alt="Plant" style={{ width: '80px' }} />
    </div>
    
    <h3 className="fw-bold">No devices connected yet</h3>
    <p className="text-muted px-3">
      Add your RodJai smart controller to start managing your farm efficiently.
    </p>
    
    <Button 
      variant="success" 
      className="rounded-pill px-4 py-2 mt-2 w-100 shadow-sm"
      style={{ backgroundColor: '#89C149', border: 'none' }}
    >
      <PlusCircle className="me-2" /> Add New Device
    </Button>
  </div>
);

export default EmptyState;