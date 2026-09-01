import React from 'react';

const AlertModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop open" style={{ zIndex: 3000, background: 'rgba(0,0,0,0.6)' }}>
      <div className="modal" style={{
        width: 'min(400px, 90%)',
        padding: '30px 20px',
        textAlign: 'center',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            color: '#ef4444'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '30px' }}>
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '22px', color: '#111827', margin: '0 0 10px' }}>{title}</h2>
          <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>{message}</p>
        </div>
        <button
          className="button button-primary"
          style={{ width: '100%', padding: '12px', fontSize: '16px', borderRadius: '12px' }}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
