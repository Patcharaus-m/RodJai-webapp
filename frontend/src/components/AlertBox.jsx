// src/components/AlertBox.jsx
import React, { useEffect, useState, useCallback } from 'react';

const typeConfig = {
  success: {
    icon: 'bi-check-circle-fill',
    bg: 'linear-gradient(135deg, #d4edda, #c3e6cb)',
    border: '#28a745',
    color: '#155724',
    iconColor: '#28a745',
  },
  error: {
    icon: 'bi-x-circle-fill',
    bg: 'linear-gradient(135deg, #f8d7da, #f5c6cb)',
    border: '#dc3545',
    color: '#721c24',
    iconColor: '#dc3545',
  },
  warning: {
    icon: 'bi-exclamation-triangle-fill',
    bg: 'linear-gradient(135deg, #fff3cd, #ffeeba)',
    border: '#ffc107',
    color: '#856404',
    iconColor: '#e0a800',
  },
  info: {
    icon: 'bi-info-circle-fill',
    bg: 'linear-gradient(135deg, #d1ecf1, #bee5eb)',
    border: '#17a2b8',
    color: '#0c5460',
    iconColor: '#17a2b8',
  },
};

export default function AlertBox({ message, type = 'info', show, onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const config = typeConfig[type] || typeConfig.info;

  const handleClose = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
      onClose?.();
    }, 350);
  }, [onClose]);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setExiting(false);

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [show, message, duration, handleClose]);

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div
        style={{
          ...styles.box,
          background: config.bg,
          borderLeft: `5px solid ${config.border}`,
          animation: exiting ? 'alertSlideOut 0.35s ease forwards' : 'alertSlideIn 0.35s ease forwards',
        }}
      >
        <div style={styles.content}>
          <i
            className={`bi ${config.icon}`}
            style={{ fontSize: '1.6rem', color: config.iconColor, flexShrink: 0 }}
          />
          <span style={{ ...styles.message, color: config.color }}>{message}</span>
        </div>
        <button
          onClick={handleClose}
          style={{ ...styles.closeBtn, color: config.color }}
          aria-label="Close"
        >
          <i className="bi bi-x-lg" />
        </button>
        {duration > 0 && (
          <div
            style={{
              ...styles.progressBar,
              backgroundColor: config.border,
              animation: `alertProgress ${duration}ms linear forwards`,
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes alertSlideIn {
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes alertSlideOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(-30px) scale(0.95); }
        }
        @keyframes alertProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '24px',
    pointerEvents: 'none',
  },
  box: {
    position: 'relative',
    minWidth: '320px',
    maxWidth: '480px',
    padding: '16px 44px 16px 16px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    pointerEvents: 'auto',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  message: {
    fontSize: '0.95rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '12px',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.2s',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    borderRadius: '0 0 12px 12px',
  },
};
