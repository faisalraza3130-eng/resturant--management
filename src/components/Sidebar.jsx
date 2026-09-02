import React from 'react';
import Logo from './Logo';

const Sidebar = ({ currentPage, onPageChange, isOpen, onStartNewDay }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>
    )},
    { id: 'menu', label: 'Menu', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    )},
    { id: 'orders', label: 'Orders', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 4h12v17H6zM9 8h6M9 12h6M9 16h4"/></svg>
    )},
    { id: 'billing', label: 'Billing', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h3M14 15h2"/></svg>
    )},
    { id: 'inventory', label: 'Inventory', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 7h16M4 12h16M4 17h16"/><path d="M7 4v16M17 4v16"/></svg>
    )},
    { id: 'expenses', label: 'Expenses', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 5h14v14H5z"/><path d="M8 9h8M8 13h5"/></svg>
    )},
    { id: 'staff', label: 'Staff', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c.7-3.6 2.7-5 6-5s5.3 1.4 6 5M15 15c2.9 0 4.5 1.2 5 4"/></svg>
    )},
    { id: 'settings', label: 'Settings', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6.7v-2.4h.1a1.7 1.7 0 0 0 1.6-1A1.7 1.7 0 0 0 8.1 9L8 8.9l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4V6a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 9l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.4H21a1.7 1.7 0 0 0-1.6.6Z"/></svg>
    )}
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="brand" style={{ padding: '10px 10px 32px' }}>
        <Logo size={32} />
      </div>
      <div className="nav-label">Workspace</div>
      <nav className="nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={currentPage === item.id ? 'active' : ''}
            onClick={() => onPageChange(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '10px', paddingTop: '10px' }}>
          <button
            className="mini-button"
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              color: '#D4AF37',
              borderColor: '#D4AF37',
              width: 'calc(100% - 24px)',
              margin: '0 12px',
              padding: '12px',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}
            onClick={onStartNewDay}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px' }}>
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Start New Day</span>
          </button>
        </div>
      </nav>
      <div className="sidebar-bottom">
        <span className="status-dot"></span>Demo workspace<br/>
        <span style={{ paddingLeft: '14px' }}>All systems ready</span>
      </div>
    </aside>
  );
};

export default Sidebar;
