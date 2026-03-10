import { Card, Row, Col } from 'react-bootstrap';
import { Tree } from 'react-bootstrap-icons';

const DeviceCard = ({ devices = [] }) => (
  <div className="px-3 mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h6 className="fw-bold mb-0">My Devices</h6>
      {devices.length > 2 && <small className="text-success fw-bold" style={{ cursor: 'pointer' }}>See all</small>}
    </div>
    <div className="row g-3">
      {devices.map((device, index) => (
        <div className="col-6" key={device._id || index}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-3">
                 <div className="p-2 rounded-circle" style={{ backgroundColor: '#f0f7e9' }}>
                   <Tree className="text-success" size={20} />
                 </div>
                 <div className="small text-muted d-flex align-items-center">
                   <span style={{ fontSize: '0.7rem' }}>🔋 {device.battery_level || 100}%</span>
                 </div>
              </div>
              <div className="fw-bold text-truncate" style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>{device.name}</div>
              <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>{device.plants_info || 'Not specified'}</div>
              <div className="mt-2 d-flex align-items-center" style={{ fontSize: '0.75rem' }}>
                <span className="me-1" style={{ color: device.is_online ? '#4caf50' : '#f44336' }}>●</span> 
                <span className={device.is_online ? "text-success" : "text-danger"}>
                  {device.is_online ? 'Online' : 'Offline'}
                </span>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

export default DeviceCard;