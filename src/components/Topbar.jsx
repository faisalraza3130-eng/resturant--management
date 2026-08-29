import React from 'react';

const Topbar = ({ title, subtitle }) => {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="top-actions">
        <button className="icon-button" title="Notifications">
          <svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>
          </svg>
        </button>
        <div className="user">
          <div className="avatar">JR</div>
          <div>
            <strong>Jordan Reed</strong>
            <span>Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
