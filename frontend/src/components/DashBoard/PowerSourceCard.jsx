import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { SunFill, LightningFill, Coin } from 'react-bootstrap-icons';

const PowerSourceCard = () => (
  <Card className="border-0 shadow-sm rounded-4 mb-3">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">
          <SunFill className="text-warning me-2" /> Power Source
        </h6>
        <Badge bg="success-light" className="text-success border border-success-light rounded-pill px-3 py-1" style={{ fontSize: '0.8rem', backgroundColor: '#f0fcf0' }}>
          <Coin className="me-1" /> Money Saved: 45 THB Today
        </Badge>
      </div>
      <Row className="text-center">
        <Col xs={6} className="border-end p-3">
          <div className="d-flex align-items-center justify-content-center mb-1">
            <SunFill size={24} className="text-warning me-2" />
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>Solar</span>
          </div>
          <div className="fw-bold h5 mb-0">12.5 <span className="small text-muted">kWh</span></div>
        </Col>
        <Col xs={6} className="p-3">
          <div className="d-flex align-items-center justify-content-center mb-1">
            <LightningFill size={24} className="text-warning me-2" />
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>Grid</span>
          </div>
          <div className="fw-bold h5 mb-0">3.2 <span className="small text-muted">kWh</span></div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default PowerSourceCard;