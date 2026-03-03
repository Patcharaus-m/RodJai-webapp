import { Container, Row, Col } from 'react-bootstrap';
import { HouseDoorFill, BarChartFill, PersonFill } from 'react-bootstrap-icons';

const BottomNav = () => {
  return (
    <div className="fixed-bottom bg-white border-top py-2 shadow-lg">
      <Container>
        <Row className="text-center align-items-end">
          {/* Home Menu */}
          <Col>
            <div className="d-flex flex-column align-items-center" style={{ color: '#89C149' }}>
              <div style={{ 
                backgroundColor: '#f0f7e9', 
                borderRadius: '15px', 
                padding: '4px 15px' 
              }}>
                <HouseDoorFill size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', marginTop: '2px', fontWeight: '500' }}>Home</span>
            </div>
          </Col>

          {/* Reports Menu */}
          <Col>
            <div className="d-flex flex-column align-items-center text-secondary">
              <BarChartFill size={20} />
              <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>Reports</span>
            </div>
          </Col>

          {/* Profile Menu */}
          <Col>
            <div className="d-flex flex-column align-items-center text-secondary">
              <PersonFill size={20} />
              <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>Profile</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BottomNav;