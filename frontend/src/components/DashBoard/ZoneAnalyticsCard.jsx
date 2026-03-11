import React from 'react';
import { Card, Badge, Row, Col, Stack } from 'react-bootstrap';
import { Robot } from 'react-bootstrap-icons';

const ZoneAnalyticsCard = () => (
  <Card className="border-0 shadow-sm rounded-4 mb-3">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">Zone Analytics</h6>
        <div className="text-muted" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Real-time</div>
      </div>
      <Row className="mb-3 align-items-center">
        <Col>
          <div className="fw-bold" style={{ fontSize: '1rem' }}>Zone 1: Salad</div>
          <Stack direction="horizontal" gap={2}>
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>Pump: OFF</div>
            <Badge bg="success-light" className="text-success border border-success-light rounded-pill px-3 py-1" style={{ fontSize: '0.8rem', backgroundColor: '#f0fcf0' }}>
              <Robot className="me-1" /> Auto
            </Badge>
          </Stack>
        </Col>
        <Col className="text-end">
          <div className="fw-bold text-success h4 m-0">--%</div>
          <div className="text-muted text-uppercase" style={{ fontSize: '0.7rem', fontWeight: '500' }}>MOISTURE</div>
        </Col>
      </Row>
      <div className="graph-container p-2 border rounded-3 bg-white" style={{ height: '150px' }}>
        {/* Placeholder for Graph - สามารถนำ Library กราฟมาใส่ได้ที่นี่ */}
        <div className="h-100 d-flex align-items-center justify-content-center text-muted small border-dashed">
          Chart Placeholder (e.g., Chart.js / react-google-charts)
        </div>
        <div className="text-end text-muted mt-1" style={{ fontSize: '0.7rem' }}>Real-time</div>
      </div>
    </Card.Body>
  </Card>
);

export default ZoneAnalyticsCard;