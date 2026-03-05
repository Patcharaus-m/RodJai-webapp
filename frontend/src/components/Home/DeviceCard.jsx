import { Card, Row, Col } from 'react-bootstrap';
import { Tree } from 'react-bootstrap-icons';

const DeviceCard = () => (
  <div className="px-3 mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h6 className="fw-bold mb-0">My Devices</h6>
      <small className="text-success fw-bold" style={{ cursor: 'pointer' }}>See all</small>
    </div>
    <div className="row g-3"> {/* ใช้ g-3 เพื่อคุมช่องว่างห่างพอดีๆ */}
      <div className="col-6">
        <Card className="border-0 shadow-sm rounded-4 h-100">
          <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-start mb-3">
               <div className="p-2 rounded-circle" style={{ backgroundColor: '#f0f7e9' }}>
                 <Tree className="text-success" size={20} />
               </div>
               <div className="small text-muted d-flex align-items-center">
                 <span style={{ fontSize: '0.7rem' }}>🔋 85%</span>
               </div>
            </div>
            <div className="fw-bold text-truncate" style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>Greenhouse A</div>
            <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>Tomatoes & Basil</div>
            <div className="mt-2 d-flex align-items-center" style={{ fontSize: '0.75rem' }}>
              <span className="me-1" style={{ color: '#4caf50' }}>●</span> 
              <span className="text-success">Online</span>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
);

export default DeviceCard;