import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ChevronLeft } from 'react-bootstrap-icons'; // npm i react-bootstrap-icons

const DashboardHeader = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <Container className="px-3">
      <Nav.Link href="/home" className="p-0 text-dark">
        <ChevronLeft size={20} />
      </Nav.Link>
      <Navbar.Brand className="mx-auto fw-bold text-center">
        <div style={{ fontSize: '1.1rem' }}>Greenhouse A</div>
        <div className="text-muted" style={{ fontSize: '0.8rem', opacity: 0.6 }}>
          <span className="dot bg-secondary rounded-circle d-inline-block me-1" style={{ width: '8px', height: '8px' }}></span>
          Offline
        </div>
      </Navbar.Brand>
      {/* ลบ wifi icon สีแดงออกแล้ว */}
      <div style={{ width: '20px' }}></div> {/* Spacer เพื่อให้ชื่ออยู่ตรงกลาง */}
    </Container>
  </Navbar>
);

export default DashboardHeader;