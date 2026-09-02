import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop open" style={{ zIndex: 4000, background: 'rgba(0,0,0,0.7)' }}>
      <div className="modal" style={{
        width: 'min(380px, 85%)',
        padding: '25px',
        textAlign: 'center',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        background: '#fff'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: '#fef3c7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            color: '#d97706'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '28px' }}>
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 style={{ fontSize: '20px', color: '#111827', margin: '0 0 8px' }}>{title}</h2>
          <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.4', margin: 0 }}>{message}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="button button-secondary"
            style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#f3f4f6' }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="button button-primary"
            style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#ef4444', color: '#fff', border: 'none' }}
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
