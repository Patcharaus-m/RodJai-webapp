// src/pages/Welcome.jsx
import HeroImage from '../components/Welcome/HeroImage';
import Button from '../components/Welcome/Button';
import { Title, Subtitle } from '../components/Welcome/Typography';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Container fluid className="welcome-container">
      
      <HeroImage />

      <div className="mt-5 text-center d-flex flex-column gap-3 mb-4">
        <Title className="mb-2">RodJai</Title>
        <Subtitle>
          Smart farming for <br /> a modern future.
        </Subtitle>
      </div>

      <div className="w-100" style={{ maxWidth: '350px' }}>
        <div className="d-grid gap-3">
          <Button 
            variant="primary"
            onClick={() => navigate('/register')}
          >
            Get Started <span>→</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
        </div>
      </div>

      <p className="mt-5 text-center px-4" style={{ fontSize: '12px', color: 'var(--slate-400)', fontWeight: '500' }}>
        By continuing, you agree to our <span style={{ color: 'var(--primary-green)', cursor: 'pointer' }}>Terms</span> & <span style={{ color: 'var(--primary-green)', cursor: 'pointer' }}>Privacy Policy</span>
      </p>
    </Container>
  );
}