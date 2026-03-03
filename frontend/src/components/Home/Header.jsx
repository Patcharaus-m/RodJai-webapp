import { Container, Row, Col } from 'react-bootstrap';
import { BellFill, PersonCircle } from 'react-bootstrap-icons'; // ลงเพิ่ม: npm i react-bootstrap-icons

const Header = () => (
  <Container fluid className="pt-4 px-4">
    <Row className="align-items-center">
      <Col xs={2}>
        <PersonCircle size={40} className="text-secondary" />
      </Col>
      <Col xs={8}>
        <div className="text-muted small">Welcome back,</div>
        <h5 className="fw-bold mb-0">Hello, Farmer!</h5>
      </Col>
      <Col xs={2} className="text-end">
        <div className="position-relative d-inline-block">
          <BellFill size={24} className="text-dark" />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Header;