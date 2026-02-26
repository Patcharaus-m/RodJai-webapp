import { Button as BootstrapButton } from 'react-bootstrap';

export default function Button({ children, variant = 'primary', className = '', onClick }) {
  const customClass = variant === 'primary' ? 'btn-rodjai-primary' : 'btn-rodjai-outline';
  
  return (
    <BootstrapButton 
      onClick={onClick}
      className={`${customClass} ${className}`}
    >
      {children}
    </BootstrapButton>
  );
}