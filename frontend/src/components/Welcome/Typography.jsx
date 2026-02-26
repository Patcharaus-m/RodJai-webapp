// src/components/Typography.jsx
export function Title({ children, className = '' }) {
  return (
    <h1 className={`rodjai-title ${className}`}>
      {children}
    </h1>
  );
}

export function Subtitle({ children, className = '' }) {
  return (
    <p className={`rodjai-subtitle ${className}`}>
      {children}
    </p>
  );
}