import { Row, Col, Card } from 'react-bootstrap';

// รับ props ชื่อ weatherData (หรือจะแยกรับเป็น temp, humidity ก็ได้)
const SummaryCard = ({ weatherData }) => (
  <div className="px-4 mt-4">
    <h6 className="fw-bold mb-3">Today's Summary</h6>
    <Card className="border-0 shadow-sm rounded-4 py-3">
      <Card.Body>
        <Row className="text-center">
          {/* ส่วนของน้ำ (สมมติว่าเป็นค่าคงที่หรือรอเชื่อม API อื่น) */}
          <Col className="border-end">
            <div className="text-muted x-small text-uppercase" style={{ fontSize: '0.7rem' }}>Water Used</div>
            <div className="fw-bold h5 mb-0">0<span className="small text-muted ms-1">L</span></div>
          </Col>

          {/* แก้ไขส่วนอุณหภูมิ: นำค่าจาก weatherData มาโชว์ */}
          <Col className="border-end">
            <div className="text-muted x-small text-uppercase" style={{ fontSize: '0.7rem' }}>Avg Temp</div>
            <div className="fw-bold h5 mb-0">
              {weatherData ? weatherData.temp : '--'}
              <span className="small text-muted ms-1">°C</span>
            </div>
          </Col>

          {/* ส่วนของพลังงาน */}
          <Col>
            <div className="text-muted x-small text-uppercase" style={{ fontSize: '0.7rem' }}>Energy</div>
            <div className="fw-bold h5 mb-0">0<span className="small text-muted ms-1">kWh</span></div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </div>
);

export default SummaryCard;