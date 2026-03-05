import { Card, Row, Col } from 'react-bootstrap';
import { SunFill, DropletFill } from 'react-bootstrap-icons';

const WeatherCard = () => (
  <div className="px-3 mt-3"> {/* ลด padding ข้างๆ ลงนิดนึง */}
    <Card className="border-0 shadow-sm rounded-5 overflow-hidden" 
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f9eb 100%)' }}>
      <Card.Body className="p-3"> {/* ลด padding จาก p-4 เป็น p-3 */}
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="text-muted fw-medium" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>LOCAL WEATHER</div>
            <h1 className="fw-bold mb-0" style={{ fontSize: '2.5rem' }}>32<span style={{ fontSize: '1.5rem' }}>°C</span></h1>
            <div className="text-muted small">Sunny & Clear Sky</div>
          </div>
          <div className="text-center p-2 rounded-4" style={{ backgroundColor: 'rgba(244, 251, 241, 0.8)', minWidth: '70px' }}>
            <div className="text-muted" style={{ fontSize: '0.65rem' }}>Humidity</div>
            <div className="fw-bold text-success">65%</div>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-white bg-opacity-75 rounded-4 d-flex align-items-center justify-content-between border border-light">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-primary bg-opacity-10 rounded-circle me-3">
              <DropletFill className="text-primary" size={16} />
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: '0.8rem' }}>Smart Rain Delay</div>
              <div className="text-muted" style={{ fontSize: '0.65rem' }}>System is ready</div>
            </div>
          </div>
          <span className="badge rounded-pill px-3 py-2 fw-normal" style={{ backgroundColor: '#e8f5e9', color: '#4caf50', fontSize: '0.65rem' }}>Standby</span>
        </div>
      </Card.Body>
    </Card>
  </div>
);

export default WeatherCard;