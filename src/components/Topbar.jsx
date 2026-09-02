import React from 'react';

const Topbar = ({ title, subtitle, onMenuClick, showBack, onBack }) => {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {showBack ? (
          <button className="mobile-nav-toggle" onClick={onBack} style={{ display: 'flex' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        ) : (
          <button className="mobile-nav-toggle" onClick={onMenuClick}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        )}
        <div>
          <h1 id="page-title">{title}</h1>
          <p id="page-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="top-actions">
        <button className="icon-button" title="Notifications">
          <svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>
          </svg>
        </button>
        <div className="user">
          <div className="avatar">MK</div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
