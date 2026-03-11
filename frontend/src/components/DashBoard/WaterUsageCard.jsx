import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { DropletFill } from 'react-bootstrap-icons';

const WaterUsageCard = () => (
  <Row className="mb-3">
    <Col xs={6}>
      <Card className="border-0 shadow-sm rounded-4 h-100">
        <Card.Body className="d-flex flex-column align-items-start p-3">
          <div className="d-flex justify-content-between align-items-center w-100 mb-1">
            <div className="text-uppercase text-muted" style={{ fontSize: '0.7rem', fontWeight: '500' }}>WATER USED</div>
            <DropletFill size={18} className="text-info" />
          </div>
          <div className="fw-bold h4 m-0">150</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>Liters Today</div>
        </Card.Body>
      </Card>
    </Col>
    <Col xs={6}>
      <Card className="border-0 shadow-sm rounded-4 h-100">
        <Card.Body className="d-flex flex-column align-items-start p-3">
          <div className="text-uppercase text-muted" style={{ fontSize: '0.7rem', fontWeight: '500' }}>MONTHLY TOTAL</div>
          <div className="fw-bold h4 m-0">4,500</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>Liters</div>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

export default WaterUsageCard;