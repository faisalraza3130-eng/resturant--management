import React from 'react';

const Modal = ({ id, isOpen, onClose, title, children, style }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} id={id} onClick={(e) => e.target.id === id && onClose()}>
      <div className="modal" style={style}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="close" onClick={onClose}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
